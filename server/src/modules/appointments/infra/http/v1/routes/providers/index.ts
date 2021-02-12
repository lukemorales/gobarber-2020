import { Router } from 'express';

import ensureAuthentication from '@modules/users/infra/http/v1/middlewares/ensureAuthentication';

import ProvidersController from '../../controllers/ProvidersController';

const routes = Router();
routes.use(ensureAuthentication);

const providersController = new ProvidersController();

routes.get('/', providersController.index);

export default routes;
