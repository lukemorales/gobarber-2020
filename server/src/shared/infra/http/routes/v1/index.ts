import { Router } from 'express';

import appointmentsRouter from '~/modules/appointments/infra/http/v1/routes/appointments';
import usersRouter from '~/modules/users/infra/http/v1/routes/users';
import sessionsRouter from '~/modules/users/infra/http/v1/routes/sessions';

const routes = Router();

routes.use('/appointments', appointmentsRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);

export default routes;
