import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { classToPlain } from 'class-transformer';
import { container } from 'tsyringe';

import ListProvidersService from '@modules/appointments/services/ListProvidersService';

export default class ProvidersController {
  public async index(request: Request, response: Response) {
    const user_id = request.user.id;

    const listProviders = container.resolve(ListProvidersService);
    listProviders.setTranslateFunction(request.t);

    const providers = await listProviders.execute({
      user_id,
    });

    return response.status(StatusCodes.OK).json(classToPlain(providers));
  }
}
