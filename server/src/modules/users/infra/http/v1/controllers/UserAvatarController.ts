import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { container } from 'tsyringe';
import { classToPlain } from 'class-transformer';

import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';

export default class UsersAvatarController {
  public async update(request: Request, response: Response) {
    const { user, file } = request;

    const updateUserAvatar = container.resolve(UpdateUserAvatarService);
    updateUserAvatar.setTranslateFunction(request.t);

    const updatedUser = await updateUserAvatar.execute({
      user_id: user.id,
      filename: file.filename,
    });

    return response.status(StatusCodes.OK).json(classToPlain(updatedUser));
  }
}
