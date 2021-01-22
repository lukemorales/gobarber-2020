import path from 'path';
import fs from 'fs';
import { StatusCodes } from 'http-status-codes';

import uploadConfig from '@config/upload-config';
import AppException from '@shared/exceptions/AppException';
import BaseService from '@shared/services/Base';
import { TFunction } from '~/@types/i18next.overrides';

import UserRepository from '../repositories/UserRepository';

interface Request {
  user_id: string;
  filename: string;
}

class UpdateUserAvatarService extends BaseService {
  constructor(private usersRepository: UserRepository, t: TFunction) {
    super(t);
  }

  public async execute({ user_id, filename }: Request) {
    const user = await this.usersRepository.findById(user_id);

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

    await this.usersRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
