import { Router } from 'express';

import SessionsController from '../../controllers/SessionsController';

const routes = Router();

const sessionsController = new SessionsController();

routes.post('/', sessionsController.create);

export default routes;
