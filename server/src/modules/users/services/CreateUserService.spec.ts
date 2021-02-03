import AppException from '@shared/exceptions/AppException';

import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;

describe('CreateUserService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
    createUser.setTranslateFunction(() => 'Error');
  });

  it('should be able to create a new user and authenticate', async () => {
    const response = await createUser.execute({
      name: 'John Doe',
      email: 'jonhdoe@example.com',
      password: '123456',
    });

    expect(response).toHaveProperty('user');
    expect(response.user).toHaveProperty('id');
    expect(response.user.email).toBe('jonhdoe@example.com');
    expect(response).toHaveProperty('token');
    expect(response.token).toBeTruthy();
  });

  it('should NOT be able to create two users with the same email', async () => {
    await createUser.execute({
      name: 'John Doe',
      email: 'jonhdoe@example.com',
      password: '123456',
    });

    await expect(
      createUser.execute({
        name: 'John Doe',
        email: 'jonhdoe@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppException);
  });
});
