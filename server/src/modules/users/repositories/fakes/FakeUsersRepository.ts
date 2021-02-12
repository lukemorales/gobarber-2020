import { nanoid } from 'nanoid';

import User from '@modules/users/infra/typeorm/entities/User';
import UserRepository from '@modules/users/repositories/UserRepository';
import CreateUserDTO from '@modules/users/dtos/CreateUserDTO';
import FindAllProvidersDTO from '@modules/users/dtos/FindAllProvidersDTO';

class UsersRepository implements UserRepository {
  private users: User[] = [];

  public async create(data: CreateUserDTO) {
    const user = new User();

    Object.assign(user, { id: nanoid() }, data);

    this.users.push(user);

    return user;
  }

  public async save(user: User) {
    const userIndex = this.users.findIndex(
      ({ id: userId }) => userId === user.id,
    );

    this.users[userIndex] = user;

    return user;
  }

  public async findById(id: string) {
    const user = await this.users.find(({ id: userId }) => userId === id);

    return user;
  }

  public async findByEmail(email: string) {
    const user = await this.users.find(
      ({ email: userEmail }) => userEmail === email,
    );

    return user;
  }

  public async findAllProviders({ excluded_user_id }: FindAllProvidersDTO) {
    let { users } = this;

    if (excluded_user_id) {
      users = await this.users.filter((user) => user.id !== excluded_user_id);
    }

    return users;
  }

  public async exists(email: string) {
    const userExists = await this.users.some(
      ({ email: userEmail }) => userEmail === email,
    );

    return userExists;
  }
}

export default UsersRepository;
