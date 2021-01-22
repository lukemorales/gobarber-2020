import { startOfHour } from 'date-fns';
import { StatusCodes } from 'http-status-codes';
import { injectable, inject } from 'tsyringe';

import AppException from '@shared/exceptions/AppException';
import BaseService from '@shared/services/Base';

import AppointmentRepository from '../repositories/AppointmentRepository';

interface Request {
  provider_id: string;
  date: Date;
}

@injectable()
class CreateAppointmentService extends BaseService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: AppointmentRepository,
  ) {
    super();
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
