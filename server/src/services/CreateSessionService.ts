import { getCustomRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import UsersRepository from '../repositories/UsersRepository';

interface Request {
  email: string;
  password: string;
}

class CreateSessionService {
  public async execute(data: Request) {
    const { email, password } = data;
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findOne({ where: { email } });

    if (!user) {
      throw new Error('Incorrect email/password combination.');
    }

    const passwordMatches = await compare(password, user.password);

    if (!passwordMatches) {
      throw new Error('Incorrect email/password combination.');
    }

    const token = sign({}, '14278b965fe170c21512c991470b8fa6', {
      subject: user.id,
      expiresIn: '1d',
    });

    return { user, token };
  }
}

export default CreateSessionService;
