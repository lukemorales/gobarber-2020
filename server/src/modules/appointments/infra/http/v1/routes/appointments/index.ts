import { Router } from 'express';

import ensureAuthentication from '~/modules/users/infra/http/v1/middlewares/ensureAuthentication';

import AppointmentsController from '../../controllers/AppointmentsController';

const routes = Router();
routes.use(ensureAuthentication);

const appointmentsController = new AppointmentsController();

routes.post('/', appointmentsController.create);

export default routes;
