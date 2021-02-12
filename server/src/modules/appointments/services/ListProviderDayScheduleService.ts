import { injectable, inject } from 'tsyringe';
import { getDaysInMonth } from 'date-fns';

import BaseService from '@shared/services/Base';
import { INITIAL_WORKING_HOUR, WORKING_HOURS } from '@shared/constants';

import AppointmentRepository from '../repositories/AppointmentRepository';

interface Request {
  provider_id: string;
  day: number;
  month: number;
  year: number;
}

interface ProviderDaySchedule {
  hour: number;
  available: boolean;
}

@injectable()
class ListProviderDayScheduleService extends BaseService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: AppointmentRepository,
  ) {
    super();
  }

  public async execute({ provider_id, day, month, year }: Request) {
    const appointments = await this.appointmentsRepository.findByDayAndProvider(
      {
        provider_id,
        day,
        month,
        year,
      },
    );

    const workingHours = Array.from(
      { length: WORKING_HOURS },
      (_, index) => index + INITIAL_WORKING_HOUR,
    );

    const providerDaySchedule = workingHours.map<ProviderDaySchedule>(
      (hour) => {
        const appointmentInHour = appointments.find(
          ({ date }) => date.getHours() === hour,
        );

        return {
          hour,
          available: !appointmentInHour,
        };
      },
    );

    return providerDaySchedule;
  }
}

export default ListProviderDayScheduleService;
