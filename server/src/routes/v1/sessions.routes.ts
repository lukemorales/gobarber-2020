import { classToPlain } from 'class-transformer';
import { Router } from 'express';
import AuthenticateUserService from '../../services/AuthenticateUserService';

const routes = Router();

routes.post('/', async (request, response) => {
  try {
    const { email, password } = request.body;

    const authenticateUser = new AuthenticateUserService();

    const session = await authenticateUser.execute({
      email,
      password,
    });

    const { user, token } = session;

    return response.json(classToPlain({ user, token }));
  } catch ({ status, message }) {
    return response.status(status).json({ message });
  }
});

export default routes;
