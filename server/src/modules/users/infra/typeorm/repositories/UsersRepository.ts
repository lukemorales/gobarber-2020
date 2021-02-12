import { getRepository, Not, Repository } from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/User';
import UserRepository from '@modules/users/repositories/UserRepository';
import CreateUserDTO from '@modules/users/dtos/CreateUserDTO';
import FindAllProvidersDTO from '@modules/users/dtos/FindAllProvidersDTO';

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
    const updatedUser = await this.ormRepository.save(user);

    return updatedUser;
  }

  public async findById(id: string) {
    const user = await this.ormRepository.findOne(id);

    return user;
  }

  public async findByEmail(email: string) {
    const user = await this.ormRepository.findOne({ where: { email } });

    return user;
  }

  public async findAllProviders({ excluded_user_id }: FindAllProvidersDTO) {
    let users: User[];

    if (excluded_user_id) {
      users = await this.ormRepository.find({
        where: {
          id: Not(excluded_user_id),
        },
      });

      return users;
    }

    users = await this.ormRepository.find();

    return users;
  }

  public async exists(email: string) {
    const howManyExists = await this.ormRepository.count({ where: { email } });

    return howManyExists > 0;
  }
}

export default UsersRepository;
