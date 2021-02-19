import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { container } from 'tsyringe';

import ListProviderMonthScheduleService from '@modules/appointments/services/ListProviderMonthScheduleService';

export default class ProviderMonthScheduleController {
  public async index(request: Request, response: Response) {
    const { provider_id } = request.params;
    const { month, year } = request.body;

    const providerMonthSchedule = container.resolve(
      ListProviderMonthScheduleService,
    );
    providerMonthSchedule.setTranslateFunction(request.t);

    const monthSchedule = await providerMonthSchedule.execute({
      year,
      month,
      provider_id,
    });

    return response.status(StatusCodes.OK).json(monthSchedule);
  }
}
