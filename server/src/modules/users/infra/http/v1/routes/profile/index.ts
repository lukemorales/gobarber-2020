import { Router } from 'express';

import ensureAuthentication from '@modules/users/infra/http/v1/middlewares/ensureAuthentication';

import ProfileController from '../../controllers/ProfileController';

const routes = Router();

const profileController = new ProfileController();

routes.use(ensureAuthentication);

routes.get('/', profileController.show);
routes.put('/', profileController.update);

export default routes;
