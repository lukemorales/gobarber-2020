import AppException from '@shared/exceptions/AppException';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import CreateUserService from '@modules/users/services/CreateUserService';
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;
let authenticateUser: AuthenticateUserService;

describe('AuthenticateUserService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
    createUser.setTranslateFunction(() => 'Error');

    authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
    authenticateUser.setTranslateFunction(() => 'Error');
  });

  it('should be able to authenticate user', async () => {
    const { user } = await createUser.execute({
      name: 'John Doe',
      email: 'jonhdoe@example.com',
      password: '123456',
    });

    const response = await authenticateUser.execute({
      email: user.email,
      password: '123456',
    });

    expect(response).toHaveProperty('user');
    expect(response.user).toHaveProperty('id');
    expect(response.user.email).toBe('jonhdoe@example.com');
    expect(response).toHaveProperty('token');
    expect(response.token).toBeTruthy();
  });

  it('should NOT authenticate a user that does not exists', async () => {
    await expect(
      authenticateUser.execute({
        email: 'wrong.email@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppException);
  });

  it('should NOT authenticate a user with wrong password', async () => {
    const { user } = await createUser.execute({
      name: 'John Doe',
      email: 'jonhdoe@example.com',
      password: '123456',
    });

    await expect(
      authenticateUser.execute({
        email: user.email,
        password: 'wrong-password',
      }),
    ).rejects.toBeInstanceOf(AppException);
  });
});
