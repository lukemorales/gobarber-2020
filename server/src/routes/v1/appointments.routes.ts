import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import AppointmentsRepository from '../../repositories/AppointmentsRepository';
import CreateAppointmentService from '../../services/CreateAppointmentService';
import ensureAuthentication from '../../middlewares/ensureAuthentication';

const routes = Router();
routes.use(ensureAuthentication);

routes.get('/', async (request, response) => {
  const appointmentsRepository = getCustomRepository(AppointmentsRepository);
  const appointments = await appointmentsRepository.find();

  return response.json(appointments);
});

routes.post('/', async (request, response) => {
  try {
    const { provider_id, date } = request.body;

    const parsedDate = parseISO(date);

    const createAppointment = new CreateAppointmentService();

    const appointment = await createAppointment.execute({
      provider_id,
      date: parsedDate,
    });

    return response.json(appointment);
  } catch ({ status, message }) {
    return response.status(status).json({ message });
  }
});

export default routes;
