import { Router } from 'express';

import ForgotPasswordController from '../../controllers/ForgotPasswordController';
import ResetPasswordController from '../../controllers/ResetPasswordController';

const routes = Router();

const forgotPasswordController = new ForgotPasswordController();
const resetPasswordController = new ResetPasswordController();

routes.post('/forgot', forgotPasswordController.create);
routes.post('/reset', resetPasswordController.update);

export default routes;
