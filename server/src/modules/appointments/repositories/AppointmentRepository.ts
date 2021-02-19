import CreateAppointmentDTO from '../dtos/CreateAppointmentDTO';
import FindByMonthAndProviderDTO from '../dtos/FindByMonthAndProviderDTO';
import FindByDayAndProviderDTO from '../dtos/FindByDayAndProviderDTO';
import Appointment from '../infra/typeorm/entities/Appointment';

export default interface AppointmentRepository {
  create(data: CreateAppointmentDTO): Promise<Appointment>;
  findByDate(date: Date): Promise<Appointment | undefined>;
  findByMonthAndProvider(
    data: FindByMonthAndProviderDTO,
  ): Promise<Appointment[]>;
  findByDayAndProvider(data: FindByDayAndProviderDTO): Promise<Appointment[]>;
  exists(date: Date): Promise<boolean>;
}
