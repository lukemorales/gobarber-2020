import CreateAppointmentDTO from '../dtos/CreateAppointmentDTO';
import Appointment from '../infra/typeorm/entities/Appointment';

export default interface AppointmentRepository {
  create(data: CreateAppointmentDTO): Promise<Appointment>;
  findByDate(date: Date): Promise<Appointment | undefined>;
  exists(date: Date): Promise<boolean>;
}
