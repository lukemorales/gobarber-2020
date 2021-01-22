import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';

import AUTH_CONFIG from '@config/auth-config';
import AppException from '@shared/exceptions/AppException';
import BaseService from '@shared/services/Base';
import { TFunction } from '~/@types/i18next.overrides';

import UserRepository from '../repositories/UserRepository';

interface Request {
  email: string;
  password: string;
}

class AuthenticateUserService extends BaseService {
  constructor(private usersRepository: UserRepository, t: TFunction) {
    super(t);
  }

  public async execute(data: Request) {
    const { email, password } = data;

    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppException(
        this.t('incorrect_credentials'),
        StatusCodes.UNAUTHORIZED,
      );
    }

    const passwordMatches = await compare(password, user.password);

    if (!passwordMatches) {
      throw new AppException(
        this.t('incorrect_credentials'),
        StatusCodes.UNAUTHORIZED,
      );
    }

    const token = AuthenticateUserService.generateToken(user.id);

    return { user, token };
  }

  static generateToken(id: string) {
    const { jwt } = AUTH_CONFIG;

    const token = sign({}, jwt.secret, {
      subject: id,
      expiresIn: jwt.expiresIn,
    });

    return token;
  }
}

export default AuthenticateUserService;
