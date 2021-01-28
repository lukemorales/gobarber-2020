import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { container } from 'tsyringe';
import { classToPlain } from 'class-transformer';

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';

export default class SessionsController {
  public async create(request: Request, response: Response) {
    const { email, password } = request.body;

    const authenticateUser = container.resolve(AuthenticateUserService);
    authenticateUser.setTranslateFunction(request.t);

    const session = await authenticateUser.execute({
      email,
      password,
    });

    return response.status(StatusCodes.CREATED).json(classToPlain(session));
  }
}
