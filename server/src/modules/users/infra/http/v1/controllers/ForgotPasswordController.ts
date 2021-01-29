import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { container } from 'tsyringe';

import SendForgotPasswordEmailService from '@modules/users/services/SendForgotPasswordEmailService';

export default class ForgotPasswordController {
  public async create(request: Request, response: Response) {
    const { email } = request.body;

    const sendForgotPasswordEmail = container.resolve(
      SendForgotPasswordEmailService,
    );
    sendForgotPasswordEmail.setTranslateFunction(request.t);

    await sendForgotPasswordEmail.execute({
      email,
    });

    return response.status(StatusCodes.NO_CONTENT);
  }
}
