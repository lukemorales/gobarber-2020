import { Raw, getRepository, Repository } from 'typeorm';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import AppointmentRepository from '@modules/appointments/repositories/AppointmentRepository';
import CreateAppointmentDTO from '@modules/appointments/dtos/CreateAppointmentDTO';
import FindByMonthAndProviderDTO from '@modules/appointments/dtos/FindByMonthAndProviderDTO';
import FindByDayAndProviderDTO from '@modules/appointments/dtos/FindByDayAndProviderDTO';

class AppointmentsRepository implements AppointmentRepository {
  private ormRepository: Repository<Appointment>;

  constructor() {
    this.ormRepository = getRepository(Appointment);
  }

  public async create(data: CreateAppointmentDTO) {
    const { provider_id, costumer_id, date } = data;

    const appointment = this.ormRepository.create({
      provider_id,
      costumer_id,
      date,
    });

    const appointmentWithId = await this.ormRepository.save(appointment);

    return appointmentWithId;
  }

  public async findByDate(date: Date) {
    const foundAppointment = await this.ormRepository.findOne({
      where: { date },
    });

    return foundAppointment;
  }

  public async findByMonthAndProvider(data: FindByMonthAndProviderDTO) {
    const { provider_id, month, year } = data;

    const paddedMonth = String(month).padStart(2, '0');

    const appointments = await this.ormRepository.find({
      where: {
        provider_id,
        date: Raw(
          (dateField) =>
            `to_char(${dateField}, 'MM-YYYY') = '${paddedMonth}-${year}'`,
        ),
      },
    });

    return appointments;
  }

  public async findByDayAndProvider(data: FindByDayAndProviderDTO) {
    const { provider_id, day, month, year } = data;

    const paddedDay = String(day).padStart(2, '0');
    const paddedMonth = String(month).padStart(2, '0');

    const appointments = await this.ormRepository.find({
      where: {
        provider_id,
        date: Raw(
          (dateField) =>
            `to_char(${dateField}, 'DD-MM-YYYY') = '${paddedDay}-${paddedMonth}-${year}'`,
        ),
      },
    });

    return appointments;
  }

  public async exists(date: Date) {
    const howManyExists = await this.ormRepository.count({ where: { date } });

    return howManyExists > 0;
  }
}

export default AppointmentsRepository;
