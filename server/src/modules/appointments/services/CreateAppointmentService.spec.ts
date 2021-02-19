import AppException from '@shared/exceptions/AppException';

import FakeAppointmentRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

let fakeAppointmentsRepository: FakeAppointmentRepository;
let createAppointment: CreateAppointmentService;

let baseDate: Date;
let currentDay: number;
let currentMonth: number;
let currentYear: number;

const PROVIDER_ID = 'provider-id';
const USER_ID = 'user-id';

const spyOnDateNow = (hour: number, frequency: 'every' | 'once' = 'once') =>
  frequency === 'once'
    ? jest
        .spyOn(Date, 'now')
        .mockImplementationOnce(() =>
          new Date(currentYear, currentMonth, currentDay, hour).getTime(),
        )
    : jest
        .spyOn(Date, 'now')
        .mockImplementation(() =>
          new Date(currentYear, currentMonth, currentDay, hour).getTime(),
        );

describe('CreateAppointmentService', () => {
  beforeAll(() => {
    baseDate = new Date();
    currentDay = baseDate.getDate();
    currentMonth = baseDate.getMonth();
    currentYear = baseDate.getFullYear();
  });

  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentRepository();

    createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );
    createAppointment.setTranslateFunction(() => 'Error');
  });

  it('should be able to create a new appointment', async () => {
    const APPOINTMENT_DATE = new Date(
      currentYear,
      currentMonth,
      currentDay,
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
      currentYear,
      currentMonth,
      currentDay,
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
      currentYear,
      currentMonth,
      currentDay,
      baseDate.getHours() - 1,
    );

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
      currentYear,
      currentMonth,
      currentDay,
      baseDate.getHours() + 1,
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
      currentYear,
      currentMonth,
      currentDay + 1,
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
      currentYear,
      currentMonth,
      currentDay + 1,
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
