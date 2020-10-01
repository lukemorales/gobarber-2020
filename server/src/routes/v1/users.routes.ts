import { classToPlain } from 'class-transformer';
import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '../../config/upload-config';
import ensureAuthentication from '../../middlewares/ensureAuthentication';
import CreateUserService from '../../services/CreateUserService';
import UpdateUserAvatarService from '../../services/UpdateUserAvatarService';

const routes = Router();
const upload = multer(uploadConfig);

routes.post('/', async (request, response) => {
  const { name, email, password } = request.body;

  const createUser = new CreateUserService();

  const user = await createUser.execute({
    name,
    email,
    password,
  });

  response.json();

  return response.json(classToPlain(user));
});

routes.patch(
  '/avatar',
  ensureAuthentication,
  upload.single('avatar'),
  async (request, response) => {
    const { user, file } = request;
    const updateUserAvatar = new UpdateUserAvatarService();

    const updatedUser = await updateUserAvatar.execute({
      user_id: user.id,
      filename: file.filename,
    });

    return response.json(classToPlain(updatedUser));
  },
);

export default routes;
