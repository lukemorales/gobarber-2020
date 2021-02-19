import { spyOnDateNow } from '@tests/utils';
import {
  BASE_DATE,
  CURRENT_DAY,
  CURRENT_MONTH,
  CURRENT_YEAR,
  PROVIDER_ID,
  USER_ID,
} from '@tests/constants';

import AppException from '@shared/exceptions/AppException';
import FakeAppointmentRepository from '@modules/appointments/repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

let fakeAppointmentsRepository: FakeAppointmentRepository;
let createAppointment: CreateAppointmentService;

describe('CreateAppointmentService', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentRepository();

    createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );
    createAppointment.setTranslateFunction(() => 'Error');
  });

  it('should be able to create a new appointment', async () => {
    const APPOINTMENT_DATE = new Date(
      CURRENT_YEAR,
      CURRENT_MONTH,
      CURRENT_DAY,
      11,
    );

    spyOnDateNow(10);

    const appointment = await createAppointment.execute({
      date: APPOINTMENT_DATE,
      provider_id: PROVIDER_ID,
      costumer_id: USER_ID,
    });

    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe(PROVIDER_ID);
    expect(appointment.costumer_id).toBe(USER_ID);
  });

  it('should NOT be able to create two appointments at the same schedule with the same provider', async () => {
    const APPOINTMENT_DATE = new Date(
      CURRENT_YEAR,
      CURRENT_MONTH,
      CURRENT_DAY,
      11,
    );

    spyOnDateNow(10, 'every');

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

  it('should NOT be able to create an appointment on a past date', async () => {
    const APPOINTMENT_DATE = new Date(
      CURRENT_YEAR,
      CURRENT_MONTH,
      CURRENT_DAY,
      10,
    );

    spyOnDateNow(12);

    await expect(
      createAppointment.execute({
        date: APPOINTMENT_DATE,
        provider_id: PROVIDER_ID,
        costumer_id: USER_ID,
      }),
    ).rejects.toBeInstanceOf(AppException);
  });

  it('should NOT be able to create an appointment with user being his own provider', async () => {
    const APPOINTMENT_DATE = new Date(
      CURRENT_YEAR,
      CURRENT_MONTH,
      CURRENT_DAY,
      BASE_DATE.getHours() + 1,
    );

    await expect(
      createAppointment.execute({
        date: APPOINTMENT_DATE,
        provider_id: PROVIDER_ID,
        costumer_id: PROVIDER_ID,
      }),
    ).rejects.toBeInstanceOf(AppException);
  });

  it('should NOT be able to create an appointment before working hours', async () => {
    const APPOINTMENT_DATE = new Date(
      CURRENT_YEAR,
      CURRENT_MONTH,
      CURRENT_DAY + 1,
      7,
    );

    await expect(
      createAppointment.execute({
        date: APPOINTMENT_DATE,
        provider_id: PROVIDER_ID,
        costumer_id: USER_ID,
      }),
    ).rejects.toBeInstanceOf(AppException);
  });

  it('should NOT be able to create an appointment after working hours', async () => {
    const APPOINTMENT_DATE = new Date(
      CURRENT_YEAR,
      CURRENT_MONTH,
      CURRENT_DAY + 1,
      18,
    );

    await expect(
      createAppointment.execute({
        date: APPOINTMENT_DATE,
        provider_id: PROVIDER_ID,
        costumer_id: PROVIDER_ID,
      }),
    ).rejects.toBeInstanceOf(AppException);
  });
});
