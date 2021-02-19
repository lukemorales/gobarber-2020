import { isBefore, startOfHour } from 'date-fns';
import { StatusCodes } from 'http-status-codes';
import { injectable, inject } from 'tsyringe';

import AppException from '@shared/exceptions/AppException';
import BaseService from '@shared/services/Base';
import { FINAL_WORKING_HOUR, INITIAL_WORKING_HOUR } from '@shared/constants';

import AppointmentRepository from '../repositories/AppointmentRepository';

interface Request {
  provider_id: string;
  costumer_id: string;
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
    const { provider_id, costumer_id, date } = data;

    if (costumer_id === provider_id) {
      throw new AppException(
        this.t('costumer_is_also_provider'),
        StatusCodes.BAD_REQUEST,
      );
    }

    const appointmentDate = startOfHour(date);
    const appointmentHour = appointmentDate.getHours();

    const isBeforeWorkingHours = appointmentHour < INITIAL_WORKING_HOUR;
    const isAfterWorkingHours = appointmentHour >= FINAL_WORKING_HOUR;

    if (isBeforeWorkingHours || isAfterWorkingHours) {
      throw new AppException(
        this.t('appointment_out_of_working_hours'),
        StatusCodes.BAD_REQUEST,
      );
    }

    if (isBefore(appointmentDate, Date.now())) {
      throw new AppException(
        this.t('appointment_date_has_passed'),
        StatusCodes.BAD_REQUEST,
      );
    }

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
      costumer_id,
      date: appointmentDate,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
