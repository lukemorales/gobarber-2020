import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { container } from 'tsyringe';

import ListProviderDayScheduleService from '@modules/appointments/services/ListProviderDayScheduleService';

export default class ProviderDayScheduleController {
  public async index(request: Request, response: Response) {
    const { provider_id } = request.params;
    const { day, month, year } = request.body;

    const providerDaySchedule = container.resolve(
      ListProviderDayScheduleService,
    );
    providerDaySchedule.setTranslateFunction(request.t);

    const daySchedule = await providerDaySchedule.execute({
      day,
      year,
      month,
      provider_id,
    });

    return response.status(StatusCodes.OK).json(daySchedule);
  }
}
