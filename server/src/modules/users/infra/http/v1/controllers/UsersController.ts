import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { container } from 'tsyringe';
import { classToPlain } from 'class-transformer';

import CreateUserService from '@modules/users/services/CreateUserService';

export default class UsersController {
  public async create(request: Request, response: Response) {
    const { name, email, password } = request.body;

    const createUser = container.resolve(CreateUserService);
    createUser.setTranslateFunction(request.t);

    const { user, token } = await createUser.execute({
      name,
      email,
      password,
    });

    return response
      .status(StatusCodes.CREATED)
      .json(classToPlain({ user, token }));
  }
}
