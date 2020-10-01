import { getCustomRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import UsersRepository from '../repositories/UsersRepository';
import AppError from '../exceptions/AppError';

interface Request {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute(data: Request) {
    const { name, email, password } = data;
    const usersRepository = getCustomRepository(UsersRepository);

    const userExists = await usersRepository.exists(email);

    if (userExists) {
      throw new AppError('This email is already registered.');
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
