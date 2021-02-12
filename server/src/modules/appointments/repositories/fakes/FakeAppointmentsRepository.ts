import { nanoid } from 'nanoid';
import { isEqual } from 'date-fns';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import AppointmentRepository from '@modules/appointments/repositories/AppointmentRepository';
import CreateAppointmentDTO from '@modules/appointments/dtos/CreateAppointmentDTO';
import FindByMonthAndProviderDTO from '@modules/appointments/dtos/FindByMonthAndProviderDTO';
import FindByDayAndProviderDTO from '@modules/appointments/dtos/FindByDayAndProviderDTO';

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

  public async findByMonthAndProvider(data: FindByMonthAndProviderDTO) {
    const { provider_id, month, year } = data;

    const appointments = this.appointments.filter(
      (appointment) =>
        appointment.provider_id === provider_id &&
        appointment.date.getMonth() + 1 === month &&
        appointment.date.getFullYear() === year,
    );

    return appointments;
  }

  public async findByDayAndProvider(data: FindByDayAndProviderDTO) {
    const { provider_id, day, month, year } = data;

    const appointments = this.appointments.filter(
      (appointment) =>
        appointment.provider_id === provider_id &&
        appointment.date.getDate() === day &&
        appointment.date.getMonth() + 1 === month &&
        appointment.date.getFullYear() === year,
    );

    return appointments;
  }

  public async exists(date: Date) {
    const appointmentExists = await this.appointments.some((appointment) =>
      isEqual(appointment.date, date),
    );

    return appointmentExists;
  }
}

export default AppointmentsRepository;
