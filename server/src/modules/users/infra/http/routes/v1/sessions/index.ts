import { classToPlain } from 'class-transformer';
import { Router } from 'express';

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

const routes = Router();

routes.post('/', async (request, response) => {
  const { email, password } = request.body;

  const usersRepository = new UsersRepository();
  const authenticateUser = new AuthenticateUserService(
    usersRepository,
    request.t,
  );

  const session = await authenticateUser.execute({
    email,
    password,
  });

  const { user, token } = session;

  return response.json(classToPlain({ user, token }));
});

export default routes;
