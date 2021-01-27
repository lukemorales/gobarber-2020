import CreateUserDTO from '../dtos/CreateUserDTO';
import User from '../infra/typeorm/entities/User';

export default interface UserRepository {
  findById(id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  create(data: CreateUserDTO): Promise<User>;
  save(user: User): Promise<User>;
  exists(email: string): Promise<boolean>;
}
