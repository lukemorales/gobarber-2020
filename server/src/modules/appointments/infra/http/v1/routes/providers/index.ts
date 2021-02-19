import { Router } from 'express';

import ensureAuthentication from '@modules/users/infra/http/v1/middlewares/ensureAuthentication';

import ProvidersController from '../../controllers/ProvidersController';
import ProviderDayScheduleController from '../../controllers/ProviderDayScheduleController';
import ProviderMonthScheduleController from '../../controllers/ProviderMonthScheduleController';

const routes = Router();
routes.use(ensureAuthentication);

const providersController = new ProvidersController();
const providerDayScheduleController = new ProviderDayScheduleController();
const providerMonthScheduleController = new ProviderMonthScheduleController();

routes.get('/', providersController.index);

routes.get(
  '/:provider_id/month-schedule',
  providerMonthScheduleController.index,
);
routes.get('/:provider_id/day-schedule', providerDayScheduleController.index);

export default routes;
