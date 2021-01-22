import { getRepository, Repository } from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/User';
import UserRepository from '@modules/users/repositories/UserRepository';
import CreateUserDTO from '~/modules/users/dtos/CreateUserDTO';

class UsersRepository implements UserRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  public async create(data: CreateUserDTO) {
    const user = this.ormRepository.create(data);

    const userWithId = await this.ormRepository.save(user);

    return userWithId;
  }

  public async save(user: User) {
    return this.ormRepository.save(user);
  }

  public async findById(id: string) {
    const user = await this.ormRepository.findOne(id);

    return user;
  }

  public async findByEmail(email: string) {
    const user = await this.ormRepository.findOne({ where: { email } });

    return user;
  }

  public async exists(email: string) {
    const howManyExists = await this.ormRepository.count({ where: { email } });

    return howManyExists > 0;
  }
}

export default UsersRepository;
