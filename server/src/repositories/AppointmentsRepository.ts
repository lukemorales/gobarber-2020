import { isEqual } from 'date-fns';
import Appointment from '../models/Appointment';

interface CreateAppointmentDTO {
  provider: string;
  date: Date;
}

class AppointmentsRepository {
  private appointments: Array<Appointment>;

  constructor() {
    this.appointments = [];
  }

  public create(data: CreateAppointmentDTO) {
    const appointment = new Appointment(data);

    this.appointments.push(appointment);

    return appointment;
  }

  public all() {
    return this.appointments;
  }

  public findByDate(date: Date): Appointment | null {
    const foundAppointment = this.appointments.find((appointment) =>
      isEqual(date, appointment.date),
    );

    return foundAppointment || null;
  }

  public exists(date: Date) {
    return this.appointments.some((appointment) =>
      isEqual(date, appointment.date),
    );
  }
}

export default AppointmentsRepository;
