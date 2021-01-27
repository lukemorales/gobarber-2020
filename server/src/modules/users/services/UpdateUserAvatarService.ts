import path from 'path';
import fs from 'fs';
import { StatusCodes } from 'http-status-codes';
import { injectable, inject } from 'tsyringe';

import uploadConfig from '@config/upload-config';
import AppException from '@shared/exceptions/AppException';
import BaseService from '@shared/services/Base';

import UserRepository from '../repositories/UserRepository';

interface Request {
  user_id: string;
  filename: string;
}

@injectable()
class UpdateUserAvatarService extends BaseService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: UserRepository,
  ) {
    super();
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
