import { classToPlain } from 'class-transformer';
import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload-config';
import CreateUserService from '@modules/users/services/CreateUserService';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import ensureAuthentication from '@modules/users/infra/http/middlewares/ensureAuthentication';

const routes = Router();
const upload = multer(uploadConfig);

routes.post('/', async (request, response) => {
  const { name, email, password } = request.body;

  const usersRepository = new UsersRepository();
  const createUser = new CreateUserService(usersRepository, request.t);

  const { user, token } = await createUser.execute({
    name,
    email,
    password,
  });

  return response.json(classToPlain({ user, token }));
});

routes.patch(
  '/avatar',
  ensureAuthentication,
  upload.single('avatar'),
  async (request, response) => {
    const { user, file } = request;

    const usersRepository = new UsersRepository();
    const updateUserAvatar = new UpdateUserAvatarService(
      usersRepository,
      request.t,
    );

    const updatedUser = await updateUserAvatar.execute({
      user_id: user.id,
      filename: file.filename,
    });

    return response.json(classToPlain(updatedUser));
  },
);

export default routes;
