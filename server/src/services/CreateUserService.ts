import { getCustomRepository } from 'typeorm';
import UsersRepository from '../repositories/UsersRepository';

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
      throw new Error('This email is already registered.');
    }

    const user = usersRepository.create({
      name,
      email,
      password,
    });

    await usersRepository.save(user);

    return user;
  }
}

export default CreateUserService;
