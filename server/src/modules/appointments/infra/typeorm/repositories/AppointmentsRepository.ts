import { getRepository, Repository } from 'typeorm';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import AppointmentRepository from '@modules/appointments/repositories/AppointmentRepository';
import CreateAppointmentDTO from '@modules/appointments/dtos/CreateAppointmentDTO';

class AppointmentsRepository implements AppointmentRepository {
  private ormRepository: Repository<Appointment>;

  constructor() {
    this.ormRepository = getRepository(Appointment);
  }

  public async create({ provider_id, date }: CreateAppointmentDTO) {
    const appointment = this.ormRepository.create({ provider_id, date });

    const appointmentWithId = await this.ormRepository.save(appointment);

    return appointmentWithId;
  }

  public async findByDate(date: Date) {
    const foundAppointment = await this.ormRepository.findOne({
      where: { date },
    });

    return foundAppointment;
  }

  public async exists(date: Date) {
    const howManyExists = await this.ormRepository.count({ where: { date } });

    return howManyExists > 0;
  }
}

export default AppointmentsRepository;
