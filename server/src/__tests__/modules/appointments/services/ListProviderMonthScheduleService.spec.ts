import {
  CURRENT_DAY,
  CURRENT_MONTH,
  CURRENT_YEAR,
  PROVIDER_ID,
  USER_ID,
} from '@tests/constants';
import { spyOnDateNow } from '@tests/utils';

import { WORKING_HOURS } from '@shared/constants';
import FakeAppointmentRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import ListProviderMonthScheduleService from '@modules/appointments/services/ListProviderMonthScheduleService';

let fakeAppointmentsRepository: FakeAppointmentRepository;
let listProviderMonthSchedule: ListProviderMonthScheduleService;

describe('ListProviderMonthScheduleService', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentRepository();

    listProviderMonthSchedule = new ListProviderMonthScheduleService(
      fakeAppointmentsRepository,
    );
    listProviderMonthSchedule.setTranslateFunction(() => 'Error');
  });

  it('should be able to list the selected provider schedule for the selected month and year', async () => {
    const fakeAppointmentsPromises = WORKING_HOURS.map((hour) =>
      fakeAppointmentsRepository.create({
        provider_id: PROVIDER_ID,
        costumer_id: USER_ID,
        date: new Date(CURRENT_YEAR, CURRENT_MONTH, CURRENT_DAY, hour, 0, 0),
      }),
    );

    await Promise.all(fakeAppointmentsPromises);

    spyOnDateNow(10);

    const providerSchedule = await listProviderMonthSchedule.execute({
      provider_id: PROVIDER_ID,
      month: CURRENT_MONTH + 1,
      year: CURRENT_YEAR,
    });

    expect(providerSchedule).toEqual(
      expect.arrayContaining<typeof providerSchedule[number]>([
        { day: CURRENT_DAY - 1, available: false },
        { day: CURRENT_DAY, available: false },
        { day: CURRENT_DAY + 1, available: true },
        { day: CURRENT_DAY + 2, available: true },
        { day: CURRENT_DAY + 3, available: true },
      ]),
    );
  });

  it('should return unavailable schedule for past days', async () => {
    const fakeAppointmentsPromises = WORKING_HOURS.map((hour) =>
      fakeAppointmentsRepository.create({
        provider_id: PROVIDER_ID,
        costumer_id: USER_ID,
        date: new Date(CURRENT_YEAR, CURRENT_MONTH, CURRENT_DAY, hour, 0, 0),
      }),
    );

    await Promise.all(fakeAppointmentsPromises);

    spyOnDateNow(10);

    const providerSchedule = await listProviderMonthSchedule.execute({
      provider_id: PROVIDER_ID,
      month: CURRENT_MONTH + 1,
      year: CURRENT_YEAR,
    });

    expect(providerSchedule).toEqual(
      expect.arrayContaining<typeof providerSchedule[number]>([
        { day: CURRENT_DAY - 5, available: false },
        { day: CURRENT_DAY - 4, available: false },
        { day: CURRENT_DAY - 3, available: false },
        { day: CURRENT_DAY - 2, available: false },
        { day: CURRENT_DAY - 1, available: false },
        { day: CURRENT_DAY, available: false },
        { day: CURRENT_DAY + 1, available: true },
      ]),
    );
  });

  it('should return available schedule for current day if requesting before working hours have end and there are available slots', async () => {
    const fakeAppointmentsPromises = WORKING_HOURS.slice(3, 8).map((hour) =>
      fakeAppointmentsRepository.create({
        provider_id: PROVIDER_ID,
        costumer_id: USER_ID,
        date: new Date(CURRENT_YEAR, CURRENT_MONTH, CURRENT_DAY, hour, 0, 0),
      }),
    );

    await Promise.all(fakeAppointmentsPromises);

    spyOnDateNow(10);

    const providerSchedule = await listProviderMonthSchedule.execute({
      provider_id: PROVIDER_ID,
      month: CURRENT_MONTH + 1,
      year: CURRENT_YEAR,
    });

    expect(providerSchedule).toEqual(
      expect.arrayContaining<typeof providerSchedule[number]>([
        { day: CURRENT_DAY - 5, available: false },
        { day: CURRENT_DAY - 4, available: false },
        { day: CURRENT_DAY - 3, available: false },
        { day: CURRENT_DAY - 2, available: false },
        { day: CURRENT_DAY - 1, available: false },
        { day: CURRENT_DAY, available: true },
        { day: CURRENT_DAY + 1, available: true },
      ]),
    );
  });

  it('should return unavailable schedule for current day if requesting after working hours have ended', async () => {
    const fakeAppointmentsPromises = WORKING_HOURS.slice(3, 8).map((hour) =>
      fakeAppointmentsRepository.create({
        provider_id: PROVIDER_ID,
        costumer_id: USER_ID,
        date: new Date(CURRENT_YEAR, CURRENT_MONTH, CURRENT_DAY, hour, 0, 0),
      }),
    );

    await Promise.all(fakeAppointmentsPromises);

    spyOnDateNow(18);

    const providerSchedule = await listProviderMonthSchedule.execute({
      provider_id: PROVIDER_ID,
      month: CURRENT_MONTH + 1,
      year: CURRENT_YEAR,
    });

    expect(providerSchedule).toEqual(
      expect.arrayContaining<typeof providerSchedule[number]>([
        { day: CURRENT_DAY - 5, available: false },
        { day: CURRENT_DAY - 4, available: false },
        { day: CURRENT_DAY - 3, available: false },
        { day: CURRENT_DAY - 2, available: false },
        { day: CURRENT_DAY - 1, available: false },
        { day: CURRENT_DAY, available: false },
        { day: CURRENT_DAY + 1, available: true },
      ]),
    );
  });
});
