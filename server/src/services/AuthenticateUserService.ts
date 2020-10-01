import { getCustomRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import UsersRepository from '../repositories/UsersRepository';
import authConfig from '../config/auth-config';
import AppError from '../errors/AppError';

interface Request {
  email: string;
  password: string;
}

class AuthenticateUserService {
  public async execute(data: Request) {
    const { email, password } = data;
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findOne({ where: { email } });

    if (!user) {
      throw new AppError('Incorrect email/password combination.', 401);
    }

    const passwordMatches = await compare(password, user.password);

    if (!passwordMatches) {
      throw new AppError('Incorrect email/password combination.', 401);
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
