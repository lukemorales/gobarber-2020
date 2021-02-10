import { StatusCodes } from 'http-status-codes';
import { injectable, inject } from 'tsyringe';

import AppException from '@shared/exceptions/AppException';
import BaseService from '@shared/services/Base';

import UserRepository from '../repositories/UserRepository';

interface Request {
  user_id: string;
}

@injectable()
class ShowProfileService extends BaseService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: UserRepository,
  ) {
    super();
  }

  public async execute({ user_id }: Request) {
    const profile = await this.usersRepository.findById(user_id);

    if (!profile) {
      throw new AppException(
        this.t('user_is_not_registered'),
        StatusCodes.UNAUTHORIZED,
      );
    }

    return profile;
  }
}

export default ShowProfileService;
