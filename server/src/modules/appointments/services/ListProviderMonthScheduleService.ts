import { injectable, inject } from 'tsyringe';
import { getDaysInMonth } from 'date-fns';

import BaseService from '@shared/services/Base';
import { WORKING_HOURS } from '@shared/constants';

import AppointmentRepository from '../repositories/AppointmentRepository';

interface Request {
  provider_id: string;
  month: number;
  year: number;
}

interface ProviderSchedule {
  day: number;
  available: boolean;
}

@injectable()
class ListProviderMonthScheduleService extends BaseService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: AppointmentRepository,
  ) {
    super();
  }

  public async execute({ provider_id, month, year }: Request) {
    const appointments = await this.appointmentsRepository.findByMonthAndProvider(
      {
        provider_id,
        month,
        year,
      },
    );

    const numberOfDaysInMonth = getDaysInMonth(new Date(year, month - 1));

    const daysOfMonth = Array.from(
      { length: numberOfDaysInMonth },
      (_, index) => index + 1,
    );

    const providerSchedule = daysOfMonth.map<ProviderSchedule>((day) => {
      const appointmentsInDay = appointments.filter(
        ({ date }) => date.getDate() === day,
      );

      return {
        day,
        available: appointmentsInDay.length < WORKING_HOURS,
      };
    });

    return providerSchedule;
  }
}

export default ListProviderMonthScheduleService;
