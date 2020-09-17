import { isEqual } from 'date-fns';
import Appointment from '../models/Appointment';

class AppointmentsRepository {
  private appointments: Array<Appointment>;

  constructor() {
    this.appointments = [];
  }

  public create(provider: string, date: Date) {
    const appointment = new Appointment(provider, date);

    this.appointments.push(appointment);

    return appointment;
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
