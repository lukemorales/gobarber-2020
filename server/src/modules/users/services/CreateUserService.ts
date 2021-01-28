import { StatusCodes } from 'http-status-codes';
import { injectable, inject } from 'tsyringe';

import AppException from '@shared/exceptions/AppException';
import BaseService from '@shared/services/Base';

import AuthenticateUserService from './AuthenticateUserService';
import UserRepository from '../repositories/UserRepository';
import HashProvider from '../providers/HashProvider/models/HashProvider';

interface Request {
  name: string;
  email: string;
  password: string;
}

@injectable()
class CreateUserService extends BaseService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: UserRepository,

    @inject('HashProvider')
    private hashProvider: HashProvider,
  ) {
    super();
  }

  public async execute(data: Request) {
    const { name, email, password } = data;

    const userExists = await this.usersRepository.exists(email);

    if (userExists) {
      throw new AppException(
        this.t('email_already_registered'),
        StatusCodes.CONFLICT,
      );
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = AuthenticateUserService.generateToken(user.id);

    return { user, token };
  }
}

export default CreateUserService;
