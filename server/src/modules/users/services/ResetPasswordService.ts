import { StatusCodes } from 'http-status-codes';
import { injectable, inject } from 'tsyringe';
import { differenceInHours } from 'date-fns';

import AppException from '@shared/exceptions/AppException';
import BaseService from '@shared/services/Base';

import UserRepository from '../repositories/UserRepository';
import UserTokenRepository from '../repositories/UserTokenRepository';
import HashProvider from '../providers/HashProvider/models/HashProvider';

interface Request {
  token: string;
  password: string;
}

@injectable()
class ResetPasswordService extends BaseService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: UserRepository,

    @inject('UserTokensRepository')
    private userTokensRepository: UserTokenRepository,

    @inject('HashProvider')
    private hashProvider: HashProvider,
  ) {
    super();
  }

  public async execute({ token, password }: Request) {
    const userToken = await this.userTokensRepository.findByToken(token);

    if (!userToken) {
      throw new AppException(
        this.t('invalid_recovery_token'),
        StatusCodes.UNAUTHORIZED,
      );
    }

    const hasTokenExpired =
      differenceInHours(new Date(Date.now()), userToken.created_at) > 2;

    if (hasTokenExpired) {
      throw new AppException(
        this.t('expired_token'),
        StatusCodes.EXPECTATION_FAILED,
      );
    }

    const user = await this.usersRepository.findById(userToken.user_id);

    if (!user) {
      throw new AppException(
        this.t('user_is_not_registered'),
        StatusCodes.NOT_FOUND,
      );
    }

    user.password = await this.hashProvider.generateHash(password);

    await this.usersRepository.save(user);
  }
}

export default ResetPasswordService;
