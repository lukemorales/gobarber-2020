import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

import { appointmentsTable } from '../database/migrations/1600388380111-CreateAppointments';

@Entity(appointmentsTable)
class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  provider: string;

  @Column('timestamp with time zone')
  date: Date;
}

export default Appointment;
