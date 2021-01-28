import AppException from '@shared/exceptions/AppException';

import FakeAppointmentRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

describe('CreateAppointmentService', () => {
  it('should be able to create a new appointment', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentRepository();

    const createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );
    createAppointment.setTranslateFunction(() => 'Error');

    const PROVIDER_ID = '12345';

    const appointment = await createAppointment.execute({
      date: new Date(),
      provider_id: PROVIDER_ID,
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe(PROVIDER_ID);
  });

  it('should NOT be able to create two appointments at the same schedule with the same provider', async () => {
    const fakeAppointmentsRepository = new FakeAppointmentRepository();

    const createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );
    createAppointment.setTranslateFunction(() => 'Error');

    const APPOINTMENT_DATE = new Date(2020, 5, 16, 11);

    const PROVIDER_ID = '12345';

    await createAppointment.execute({
      date: APPOINTMENT_DATE,
      provider_id: PROVIDER_ID,
    });

    expect(
      createAppointment.execute({
        date: APPOINTMENT_DATE,
        provider_id: PROVIDER_ID,
      }),
    ).rejects.toBeInstanceOf(AppException);
  });
});
