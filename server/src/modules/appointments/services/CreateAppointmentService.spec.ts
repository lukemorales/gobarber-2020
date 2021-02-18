import AppException from '@shared/exceptions/AppException';

import FakeAppointmentRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

let fakeAppointmentsRepository: FakeAppointmentRepository;
let createAppointment: CreateAppointmentService;

const PROVIDER_ID = '12345';
const USER_ID = '54321';

describe('CreateAppointmentService', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentRepository();

    createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );
    createAppointment.setTranslateFunction(() => 'Error');
  });

  it('should be able to create a new appointment', async () => {
    const appointment = await createAppointment.execute({
      date: new Date(),
      provider_id: PROVIDER_ID,
      costumer_id: USER_ID,
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe(PROVIDER_ID);
    expect(appointment.costumer_id).toBe(USER_ID);
  });

  it('should NOT be able to create two appointments at the same schedule with the same provider', async () => {
    const APPOINTMENT_DATE = new Date(2020, 5, 16, 11);

    await createAppointment.execute({
      date: APPOINTMENT_DATE,
      provider_id: PROVIDER_ID,
      costumer_id: USER_ID,
    });

    await expect(
      createAppointment.execute({
        date: APPOINTMENT_DATE,
        provider_id: PROVIDER_ID,
        costumer_id: USER_ID,
      }),
    ).rejects.toBeInstanceOf(AppException);
  });
});
