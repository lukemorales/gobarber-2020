import { classToPlain } from 'class-transformer';
import { Router } from 'express';
import CreateUserService from '../../services/CreateUserService';

const routes = Router();

routes.post('/', async (request, response) => {
  try {
    const { name, email, password } = request.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({
      name,
      email,
      password,
    });

    return response.json(classToPlain(user));
  } catch (err) {
    return response.status(400).json({ message: err.message });
  }
});

export default routes;
