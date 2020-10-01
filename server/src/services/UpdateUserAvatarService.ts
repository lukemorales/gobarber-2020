import { getCustomRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';
import UsersRepository from '../repositories/UsersRepository';
import uploadConfig from '../config/upload-config';

import AppError from '../exceptions/AppError';

interface Request {
  user_id: string;
  filename: string;
}

class UpdateUserAvatarService {
  public async execute(data: Request) {
    const { user_id, filename } = data;
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findOne(user_id);

    if (!user) {
      throw new AppError('User is not registered.', 401);
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
