import { nanoid } from 'nanoid';
import { isEqual } from 'date-fns';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import AppointmentRepository from '@modules/appointments/repositories/AppointmentRepository';
import CreateAppointmentDTO from '@modules/appointments/dtos/CreateAppointmentDTO';

class AppointmentsRepository implements AppointmentRepository {
  private appointments: Appointment[] = [];

  public async create({ provider_id, date }: CreateAppointmentDTO) {
    const appointment = new Appointment();

    Object.assign(appointment, { id: nanoid(), provider_id, date });

    this.appointments.push(appointment);

    return appointment;
  }

  public async findByDate(date: Date) {
    const foundAppointment = await this.appointments.find((appointment) =>
      isEqual(appointment.date, date),
    );

    return foundAppointment;
  }

  public async exists(date: Date) {
    return this.appointments.some((appointment) =>
      isEqual(appointment.date, date),
    );
  }
}

export default AppointmentsRepository;
