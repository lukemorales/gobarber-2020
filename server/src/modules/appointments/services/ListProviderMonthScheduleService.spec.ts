import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import { INITIAL_WORKING_HOUR, WORKING_HOURS } from '@shared/constants';

import FakeAppointmentRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderMonthScheduleService from './ListProviderMonthScheduleService';

let fakeUsersRepository: FakeUsersRepository;
let fakeAppointmentsRepository: FakeAppointmentRepository;
let listProviderMonthSchedule: ListProviderMonthScheduleService;

let baseDate: Date;
let currentDay: number;
let currentMonth: number;
let currentYear: number;

const workingHours = Array.from(
  { length: WORKING_HOURS },
  (_, index) => index + INITIAL_WORKING_HOUR,
);

describe('ListProviderMonthScheduleService', () => {
  beforeAll(() => {
    baseDate = new Date();
    currentDay = 15;
    currentMonth = baseDate.getMonth();
    currentYear = baseDate.getFullYear();
  });

  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeAppointmentsRepository = new FakeAppointmentRepository();

    listProviderMonthSchedule = new ListProviderMonthScheduleService(
      fakeAppointmentsRepository,
    );
    listProviderMonthSchedule.setTranslateFunction(() => 'Error');
  });

  it('should be able to list the selected provider schedule for the selected month and year', async () => {
    const provider = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const fakeAppointmentsPromises = workingHours.map((hour) =>
      fakeAppointmentsRepository.create({
        provider_id: provider.id,
        costumer_id: '123456',
        date: new Date(currentYear, currentMonth, currentDay, hour, 0, 0),
      }),
    );

    await Promise.all(fakeAppointmentsPromises);

    jest
      .spyOn(Date, 'now')
      .mockImplementationOnce(() =>
        new Date(currentYear, currentMonth, currentDay, 10).getTime(),
      );

    const providerSchedule = await listProviderMonthSchedule.execute({
      provider_id: provider.id,
      month: currentMonth + 1,
      year: currentYear,
    });

    expect(providerSchedule).toEqual(
      expect.arrayContaining<typeof providerSchedule[number]>([
        { day: currentDay - 1, available: false },
        { day: currentDay, available: false },
        { day: currentDay + 1, available: true },
        { day: currentDay + 2, available: true },
        { day: currentDay + 3, available: true },
      ]),
    );
  });

  it('should return unavailable schedule for past days', async () => {
    const provider = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const fakeAppointmentsPromises = workingHours.map((hour) =>
      fakeAppointmentsRepository.create({
        provider_id: provider.id,
        costumer_id: '123456',
        date: new Date(currentYear, currentMonth, currentDay, hour, 0, 0),
      }),
    );

    await Promise.all(fakeAppointmentsPromises);

    jest
      .spyOn(Date, 'now')
      .mockImplementationOnce(() =>
        new Date(currentYear, currentMonth, currentDay, 10).getTime(),
      );

    const providerSchedule = await listProviderMonthSchedule.execute({
      provider_id: provider.id,
      month: currentMonth + 1,
      year: currentYear,
    });

    expect(providerSchedule).toEqual(
      expect.arrayContaining<typeof providerSchedule[number]>([
        { day: currentDay - 5, available: false },
        { day: currentDay - 4, available: false },
        { day: currentDay - 3, available: false },
        { day: currentDay - 2, available: false },
        { day: currentDay - 1, available: false },
        { day: currentDay, available: false },
        { day: currentDay + 1, available: true },
      ]),
    );
  });

  it('should return available schedule for current day if requesting before working hours have end and there are available slots', async () => {
    const provider = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const fakeAppointmentsPromises = workingHours.slice(3, 8).map((hour) =>
      fakeAppointmentsRepository.create({
        provider_id: provider.id,
        costumer_id: '123456',
        date: new Date(currentYear, currentMonth, currentDay, hour, 0, 0),
      }),
    );

    await Promise.all(fakeAppointmentsPromises);

    jest
      .spyOn(Date, 'now')
      .mockImplementationOnce(() =>
        new Date(currentYear, currentMonth, currentDay, 10).getTime(),
      );

    const providerSchedule = await listProviderMonthSchedule.execute({
      provider_id: provider.id,
      month: currentMonth + 1,
      year: currentYear,
    });

    expect(providerSchedule).toEqual(
      expect.arrayContaining<typeof providerSchedule[number]>([
        { day: currentDay - 5, available: false },
        { day: currentDay - 4, available: false },
        { day: currentDay - 3, available: false },
        { day: currentDay - 2, available: false },
        { day: currentDay - 1, available: false },
        { day: currentDay, available: true },
        { day: currentDay + 1, available: true },
      ]),
    );
  });

  it('should return unavailable schedule for current day if requesting after working hours have ended', async () => {
    const provider = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const fakeAppointmentsPromises = workingHours.slice(3, 8).map((hour) =>
      fakeAppointmentsRepository.create({
        provider_id: provider.id,
        costumer_id: '123456',
        date: new Date(currentYear, currentMonth, currentDay, hour, 0, 0),
      }),
    );

    await Promise.all(fakeAppointmentsPromises);

    jest
      .spyOn(Date, 'now')
      .mockImplementationOnce(() =>
        new Date(currentYear, currentMonth, currentDay, 18).getTime(),
      );

    const providerSchedule = await listProviderMonthSchedule.execute({
      provider_id: provider.id,
      month: currentMonth + 1,
      year: currentYear,
    });

    expect(providerSchedule).toEqual(
      expect.arrayContaining<typeof providerSchedule[number]>([
        { day: currentDay - 5, available: false },
        { day: currentDay - 4, available: false },
        { day: currentDay - 3, available: false },
        { day: currentDay - 2, available: false },
        { day: currentDay - 1, available: false },
        { day: currentDay, available: false },
        { day: currentDay + 1, available: true },
      ]),
    );
  });
});
