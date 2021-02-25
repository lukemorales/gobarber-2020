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
import ListProviderDayScheduleService from '@modules/appointments/services/ListProviderDayScheduleService';

let fakeAppointmentsRepository: FakeAppointmentRepository;
let listProviderDaySchedule: ListProviderDayScheduleService;

describe('ListProviderDayScheduleService', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentRepository();

    listProviderDaySchedule = new ListProviderDayScheduleService(
      fakeAppointmentsRepository,
    );
    listProviderDaySchedule.setTranslateFunction(() => 'Error');
  });

  it('should be able to list the selected provider schedule for the selected day', async () => {
    const fakeAppointmentsInEvenHoursPromises = WORKING_HOURS.map((hour) => {
      const isEvenHour = hour % 2 === 0;

      if (!isEvenHour) {
        return undefined;
      }

      return fakeAppointmentsRepository.create({
        provider_id: PROVIDER_ID,
        costumer_id: USER_ID,
        date: new Date(CURRENT_YEAR, CURRENT_MONTH, CURRENT_DAY, hour, 0, 0),
      });
    });

    await Promise.all(fakeAppointmentsInEvenHoursPromises);

    spyOnDateNow(11);

    const providerDaySchedule = await listProviderDaySchedule.execute({
      provider_id: PROVIDER_ID,
      day: CURRENT_DAY,
      month: CURRENT_MONTH + 1,
      year: CURRENT_YEAR,
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
