import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { container } from 'tsyringe';

import ResetPasswordService from '@modules/users/services/ResetPasswordService';

export default class ForgotPasswordController {
  public async update(request: Request, response: Response) {
    const { password, token } = request.body;

    const resetPassword = container.resolve(ResetPasswordService);
    resetPassword.setTranslateFunction(request.t);

    await resetPassword.execute({
      token,
      password,
    });

    return response.status(StatusCodes.NO_CONTENT);
  }
}
