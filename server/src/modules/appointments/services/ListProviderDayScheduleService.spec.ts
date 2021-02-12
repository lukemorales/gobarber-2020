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

  it('should be able to list the selected provider schedule for the selected month and year', async () => {
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
        date: new Date(currentYear, currentMonth, currentDay, hour, 0, 0),
      });
    });

    await Promise.all(fakeAppointmentsInEvenHoursPromises);

    const providerDaySchedule = await listProviderDaySchedule.execute({
      provider_id: provider.id,
      day: currentDay,
      month: currentMonth + 1,
      year: currentYear,
    });

    expect(providerDaySchedule).toEqual(
      expect.arrayContaining<typeof providerDaySchedule[number]>([
        { hour: workingHours[0], available: false },
        { hour: workingHours[1], available: true },
        { hour: workingHours[2], available: false },
        { hour: workingHours[3], available: true },
        { hour: workingHours[4], available: false },
      ]),
    );
  });
});
