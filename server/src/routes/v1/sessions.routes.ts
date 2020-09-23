import { classToPlain } from 'class-transformer';
import { Router } from 'express';
import CreateSessionService from '../../services/CreateSessionService';

const routes = Router();

routes.post('/', async (request, response) => {
  try {
    const { email, password } = request.body;

    const authenticateUser = new CreateSessionService();

    const { user } = await authenticateUser.execute({
      email,
      password,
    });

    return response.json(classToPlain({ user }));
  } catch (err) {
    return response.status(400).json({ message: err.message });
  }
});

export default routes;