import { injectable, inject } from 'tsyringe';
import { isAfter } from 'date-fns';

import BaseService from '@shared/services/Base';
import { WORKING_HOURS } from '@shared/constants';

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

    const currentDate = new Date(Date.now());

    const providerDaySchedule = WORKING_HOURS.map<ProviderDaySchedule>(
      (hour) => {
        const appointmentInHour = appointments.find(
          ({ date }) => date.getHours() === hour,
        );

        const baseDate = new Date(year, month - 1, day, hour);

        return {
          hour,
          available: !appointmentInHour && isAfter(baseDate, currentDate),
        };
      },
    );

    return providerDaySchedule;
  }
}

export default ListProviderDayScheduleService;
