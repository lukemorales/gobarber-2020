import { getRepository, Repository } from 'typeorm';

import UserTokenRepository from '@modules/users/repositories/UserTokenRepository';
import CreateUserDTO from '@modules/users/dtos/CreateUserDTO';

import UserToken from '../entities/UserToken';

class UsersTokenRepository implements UserTokenRepository {
  private ormRepository: Repository<UserToken>;

  constructor() {
    this.ormRepository = getRepository(UserToken);
  }

  public async generate(user_id: string) {
    const userToken = this.ormRepository.create({ user_id });

    await this.ormRepository.save(userToken);

    return userToken;
  }

  public async findByToken(token: string) {
    const userToken = await this.ormRepository.findOne({
      where: { token },
    });

    return userToken;
  }
}

export default UsersTokenRepository;
