import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import { INITIAL_WORKING_HOUR, WORKING_HOURS } from '@shared/constants';

import FakeAppointmentRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListProviderDayScheduleService from './ListProviderDayScheduleService';

let fakeUsersRepository: FakeUsersRepository;
let fakeAppointmentsRepository: FakeAppointmentRepository;
let listProviderDaySchedule: ListProviderDayScheduleService;

let baseDate: Date;
let currentDay: number;
let currentMonth: number;
let currentYear: number;

const workingHours = Array.from(
  { length: WORKING_HOURS },
  (_, index) => index + INITIAL_WORKING_HOUR,
);

describe('ListProviderDayScheduleService', () => {
  beforeAll(() => {
    baseDate = new Date();
    currentDay = baseDate.getDate();
    currentMonth = baseDate.getMonth();
    currentYear = baseDate.getFullYear();
  });

  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeAppointmentsRepository = new FakeAppointmentRepository();

    listProviderDaySchedule = new ListProviderDayScheduleService(
      fakeAppointmentsRepository,
    );
    listProviderDaySchedule.setTranslateFunction(() => 'Error');
  });

  it('should be able to list the selected provider schedule for the selected day', async () => {
    const provider = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const fakeAppointmentsInEvenHoursPromises = workingHours.map((hour) => {
      const isEvenHour = hour % 2 === 0;

      if (!isEvenHour) {
        return undefined;
      }

      return fakeAppointmentsRepository.create({
        provider_id: provider.id,
        costumer_id: '123456',
        date: new Date(currentYear, currentMonth, currentDay, hour, 0, 0),
      });
    });

    await Promise.all(fakeAppointmentsInEvenHoursPromises);

    jest
      .spyOn(Date, 'now')
      .mockImplementationOnce(() =>
        new Date(currentYear, currentMonth, currentDay, 11).getTime(),
      );

    const providerDaySchedule = await listProviderDaySchedule.execute({
      provider_id: provider.id,
      day: currentDay,
      month: currentMonth + 1,
      year: currentYear,
    });

    expect(providerDaySchedule).toEqual(
      expect.arrayContaining<typeof providerDaySchedule[number]>([
        { hour: 8, available: false },
        { hour: 9, available: false },
        { hour: 10, available: false },
        { hour: 11, available: false },
        { hour: 12, available: false },
        { hour: 13, available: true },
        { hour: 14, available: false },
        { hour: 15, available: true },
        { hour: 16, available: false },
        { hour: 17, available: true },
      ]),
    );
  });
});
