import { Router } from 'express';

import usersRouter from '@modules/users/infra/http/v1/routes/users';
import sessionsRouter from '@modules/users/infra/http/v1/routes/sessions';
import passwordRouter from '@modules/users/infra/http/v1/routes/password';
import profileRouter from '@modules/users/infra/http/v1/routes/profile';
import appointmentsRouter from '@modules/appointments/infra/http/v1/routes/appointments';
import providersRouter from '@modules/appointments/infra/http/v1/routes/providers';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordRouter);
routes.use('/profile', profileRouter);

routes.use('/appointments', appointmentsRouter);
routes.use('/providers', providersRouter);

export default routes;
