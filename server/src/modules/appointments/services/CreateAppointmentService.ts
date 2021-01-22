import { startOfHour } from 'date-fns';
import { StatusCodes } from 'http-status-codes';

import AppException from '@shared/exceptions/AppException';
import BaseService from '@shared/services/Base';
import { TFunction } from '~/@types/i18next.overrides';

import AppointmentRepository from '../repositories/AppointmentRepository';

interface Request {
  provider_id: string;
  date: Date;
}

class CreateAppointmentService extends BaseService {
  constructor(
    private appointmentsRepository: AppointmentRepository,
    t: TFunction,
  ) {
    super(t);
  }

  public async execute(data: Request) {
    const { provider_id, date } = data;

    const appointmentDate = startOfHour(date);
    const appointmentExists = await this.appointmentsRepository.exists(
      appointmentDate,
    );

    if (appointmentExists) {
      throw new AppException(
        this.t('appointment_already_booked'),
        StatusCodes.CONFLICT,
      );
    }

    const appointment = await this.appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
