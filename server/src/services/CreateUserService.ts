import { getCustomRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import { StatusCodes } from 'http-status-codes';
import UsersRepository from '../repositories/UsersRepository';
import AppException from '../exceptions/AppException';
import BaseService from '../common/base.services';

interface Request {
  name: string;
  email: string;
  password: string;
}

class CreateUserService extends BaseService {
  public async execute(data: Request) {
    const { name, email, password } = data;
    const usersRepository = getCustomRepository(UsersRepository);

    const userExists = await usersRepository.exists(email);

    if (userExists) {
      throw new AppException(
        this.t('email_already_registered'),
        StatusCodes.CONFLICT,
      );
    }

    const hashedPassword = await hash(password, 8);

    const user = usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    await usersRepository.save(user);

    return user;
  }
}

export default CreateUserService;
