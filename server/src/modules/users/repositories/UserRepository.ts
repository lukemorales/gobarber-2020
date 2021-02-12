import CreateUserDTO from '../dtos/CreateUserDTO';
import FindAllProvidersDTO from '../dtos/FindAllProvidersDTO';
import User from '../infra/typeorm/entities/User';

export default interface UserRepository {
  findById(id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  findAllProviders(data: FindAllProvidersDTO): Promise<User[]>;
  create(data: CreateUserDTO): Promise<User>;
  save(user: User): Promise<User>;
  exists(email: string): Promise<boolean>;
}
