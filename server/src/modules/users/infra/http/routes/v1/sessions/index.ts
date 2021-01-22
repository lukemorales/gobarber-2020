import { classToPlain } from 'class-transformer';
import { Router } from 'express';
import { container } from 'tsyringe';

import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';

const routes = Router();

routes.post('/', async (request, response) => {
  const { email, password } = request.body;

  const authenticateUser = container.resolve(AuthenticateUserService);
  authenticateUser.setTranslateFunction(request.t);

  const session = await authenticateUser.execute({
    email,
    password,
  });

  const { user, token } = session;

  return response.json(classToPlain({ user, token }));
});

export default routes;
