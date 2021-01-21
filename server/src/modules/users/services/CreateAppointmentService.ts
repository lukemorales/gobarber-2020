import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import { StatusCodes } from 'http-status-codes';
import AppointmentsRepository from '../../appointments/repositories/AppointmentsRepository';
import AppException from '../../../shared/exceptions/AppException';
import BaseService from '../../../shared/services/Base';

interface Request {
  provider_id: string;
  date: Date;
}

class CreateAppointmentService extends BaseService {
  public async execute(data: Request) {
    const { provider_id, date } = data;
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);

    const appointmentDate = startOfHour(date);
    const appointmentExists = await appointmentsRepository.exists(
      appointmentDate,
    );

    if (appointmentExists) {
      throw new AppException(
        this.t('appointment_already_booked'),
        StatusCodes.CONFLICT,
      );
    }

    const appointment = appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
    });

    await appointmentsRepository.save(appointment);

    return appointment;
  }
}

export default CreateAppointmentService;
