import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { container } from 'tsyringe';
import { classToPlain } from 'class-transformer';

import UpdateProfileService from '@modules/users/services/UpdateProfileService';

export default class ProfileController {
  public async update(request: Request, response: Response) {
    const { name, email, old_password, password } = request.body;

    const updateProfile = container.resolve(UpdateProfileService);
    updateProfile.setTranslateFunction(request.t);

    const updatedUser = await updateProfile.execute({
      user_id: request.user.id,
      name,
      email,
      old_password,
      password,
    });

    return response
      .status(StatusCodes.ACCEPTED)
      .json(classToPlain(updatedUser));
  }
}
