import { classToPlain } from 'class-transformer';
import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../../../../../config/upload-config';
import ensureAuthentication from '../../middlewares/ensureAuthentication';
import CreateUserService from '../../../../../modules/users/services/CreateUserService';
import UpdateUserAvatarService from '../../../../../modules/users/services/UpdateUserAvatarService';

const routes = Router();
const upload = multer(uploadConfig);

routes.post('/', async (request, response) => {
  const { name, email, password } = request.body;

  const createUser = new CreateUserService(request.t);

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

    const updateUserAvatar = new UpdateUserAvatarService(request.t);

    const updatedUser = await updateUserAvatar.execute({
      user_id: user.id,
      filename: file.filename,
    });

    return response.json(classToPlain(updatedUser));
  },
);

export default routes;
