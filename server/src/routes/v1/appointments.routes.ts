import { Router } from 'express';
import { parseISO } from 'date-fns';
import AppointmentsRepository from '../../repositories/AppointmentsRepository';
import CreateAppointmentService from '../../services/CreateAppointmentService';

const routes = Router();
const appointmentsRepository = new AppointmentsRepository();

routes.get('/', (request, response) => {
  const appointments = appointmentsRepository.all();

  return response.json(appointments);
});

routes.post('/', (request, response) => {
  try {
    const { provider, date } = request.body;

    const parsedDate = parseISO(date);

    const createAppointment = new CreateAppointmentService(
      appointmentsRepository,
    );

    const appointment = createAppointment.execute({
      provider,
      date: parsedDate,
    });

    return response.json(appointment);
  } catch (err) {
    return response.status(400).json({ message: err.message });
  }
});

export default routes;
