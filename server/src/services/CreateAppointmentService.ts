import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import AppException from '../exceptions/AppException';
import BaseService from '../common/base.services';

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
      throw new AppException(this.t('appointment_already_booked'), 409);
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
