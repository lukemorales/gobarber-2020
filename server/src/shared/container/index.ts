import { container } from 'tsyringe';

import '@modules/users/providers';

import AppointmentRepository from '@modules/appointments/repositories/AppointmentRepository';
import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppointmentsRepository';
import UserRepository from '@modules/users/repositories/UserRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

container.registerSingleton<AppointmentRepository>(
  'AppointmentsRepository',
  AppointmentsRepository,
);

container.registerSingleton<UserRepository>('UsersRepository', UsersRepository);
