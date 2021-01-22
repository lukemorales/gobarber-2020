import { getCustomRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';
import { StatusCodes } from 'http-status-codes';

import uploadConfig from '@config/upload-config';
import AppException from '@shared/exceptions/AppException';
import BaseService from '@shared/services/Base';

import UsersRepository from '../repositories/UsersRepository';

interface Request {
  user_id: string;
  filename: string;
}

class UpdateUserAvatarService extends BaseService {
  public async execute(data: Request) {
    const { user_id, filename } = data;
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findOne(user_id);

    if (!user) {
      throw new AppException(
        this.t('user_is_not_registered'),
        StatusCodes.UNAUTHORIZED,
      );
    }

    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = filename;

    await usersRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
