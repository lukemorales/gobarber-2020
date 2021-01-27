import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload-config';
import ensureAuthentication from '@modules/users/infra/http/v1/middlewares/ensureAuthentication';

import UsersController from '../../controllers/UsersController';
import UserAvatarController from '../../controllers/UserAvatarController';

const routes = Router();
const upload = multer(uploadConfig);

const usersController = new UsersController();
const userAvatarController = new UserAvatarController();

routes.post('/', usersController.create);

routes.patch(
  '/avatar',
  ensureAuthentication,
  upload.single('avatar'),
  userAvatarController.update,
);

export default routes;
