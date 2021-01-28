import { StatusCodes } from 'http-status-codes';
import { injectable, inject } from 'tsyringe';

import AppException from '@shared/exceptions/AppException';
import BaseService from '@shared/services/Base';
import StorageProvider from '@shared/container/providers/StorageProvider/models/StorageProvider';

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

    @inject('StorageProvider')
    private storageProvider: StorageProvider,
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
      await this.storageProvider.deleteFile(user.avatar);
    }

    const avatarFileName = await this.storageProvider.saveFile(filename);

    user.avatar = avatarFileName;

    await this.usersRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
