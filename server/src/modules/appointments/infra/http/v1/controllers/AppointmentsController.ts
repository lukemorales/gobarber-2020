import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { parseISO } from 'date-fns';
import { container } from 'tsyringe';

import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

export default class AppointmentsController {
  public async create(request: Request, response: Response) {
    const { provider_id, date } = request.body;

    const parsedDate = parseISO(date);

    const createAppointment = container.resolve(CreateAppointmentService);
    createAppointment.setTranslateFunction(request.t);

    const appointment = await createAppointment.execute({
      provider_id,
      date: parsedDate,
    });

    return response.status(StatusCodes.CREATED).json(appointment);
  }
}
