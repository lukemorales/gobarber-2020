import { classToPlain } from 'class-transformer';
import { Router } from 'express';
import multer from 'multer';
import { container } from 'tsyringe';

import uploadConfig from '@config/upload-config';
import CreateUserService from '@modules/users/services/CreateUserService';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';
import ensureAuthentication from '@modules/users/infra/http/middlewares/ensureAuthentication';

const routes = Router();
const upload = multer(uploadConfig);

routes.post('/', async (request, response) => {
  const { name, email, password } = request.body;

  const createUser = container.resolve(CreateUserService);
  createUser.setTranslateFunction(request.t);

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

    const updateUserAvatar = container.resolve(UpdateUserAvatarService);
    updateUserAvatar.setTranslateFunction(request.t);

    const updatedUser = await updateUserAvatar.execute({
      user_id: user.id,
      filename: file.filename,
    });

    return response.json(classToPlain(updatedUser));
  },
);

export default routes;
