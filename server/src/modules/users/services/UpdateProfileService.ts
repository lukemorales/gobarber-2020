import { StatusCodes } from 'http-status-codes';
import { injectable, inject } from 'tsyringe';

import AppException from '@shared/exceptions/AppException';
import BaseService from '@shared/services/Base';

import HashProvider from '../providers/HashProvider/models/HashProvider';
import UserRepository from '../repositories/UserRepository';

interface RequestWithoutPassword {
  user_id: string;
  name: string;
  email: string;
  old_password?: never;
  password?: never;
}

interface RequestWithPassword
  extends Omit<RequestWithoutPassword, 'old_password' | 'password'> {
  old_password: string;
  password: string;
}

type Request = RequestWithoutPassword | RequestWithPassword;

@injectable()
class UpdateProfileService extends BaseService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: UserRepository,

    @inject('HashProvider')
    private hashProvider: HashProvider,
  ) {
    super();
  }

  public async execute({ user_id, name, email, ...passwords }: Request) {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppException(
        this.t('user_is_not_registered'),
        StatusCodes.UNAUTHORIZED,
      );
    }

    const registeredUser = await this.usersRepository.findByEmail(email);

    if (registeredUser && registeredUser.id !== user.id) {
      throw new AppException(
        this.t('email_already_registered'),
        StatusCodes.CONFLICT,
      );
    }

    const { old_password, password } = passwords;

    if (password) {
      if (!old_password) {
        throw new AppException(
          this.t('missing_old_password'),
          StatusCodes.BAD_REQUEST,
        );
      }

      const isNotTheSamePassword = !(await this.hashProvider.compareHash(
        old_password,
        user.password,
      ));

      if (isNotTheSamePassword) {
        throw new AppException(
          this.t('wrong_old_password'),
          StatusCodes.CONFLICT,
        );
      }

      user.password = await this.hashProvider.generateHash(password);
    }

    Object.assign(user, { name, email });

    await this.usersRepository.save(user);

    return user;
  }
}

export default UpdateProfileService;
