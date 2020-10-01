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

routes.patch(
  '/avatar',
  ensureAuthentication,
  upload.single('avatar'),
  async (request, response) => {
    try {
      const { user, file } = request;
      const updateUserAvatar = new UpdateUserAvatarService();

      const updatedUser = await updateUserAvatar.execute({
        user_id: user.id,
        filename: file.filename,
      });

      return response.json(classToPlain(updatedUser));
    } catch ({ status, message }) {
      return response.status(status).json({ message });
    }
  },
);

export default routes;
