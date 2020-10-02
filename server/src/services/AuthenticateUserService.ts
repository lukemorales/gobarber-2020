import { getCustomRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';
import UsersRepository from '../repositories/UsersRepository';
import authConfig from '../config/auth-config';
import AppException from '../exceptions/AppException';
import BaseService from '../common/base.services';

interface Request {
  email: string;
  password: string;
}

class AuthenticateUserService extends BaseService {
  public async execute(data: Request) {
    const { email, password } = data;
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findOne({ where: { email } });

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

    const { jwt } = authConfig;

    const token = sign({}, jwt.secret, {
      subject: user.id,
      expiresIn: jwt.expiresIn,
    });

    return { user, token };
  }
}

export default AuthenticateUserService;
