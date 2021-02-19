import { spyOnDateNow } from '@tests/utils';

import AppException from '@shared/exceptions/AppException';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ResetPasswordService from '@modules/users/services/ResetPasswordService';
import FakeUserTokensRepository from '@modules/users/repositories/fakes/FakeUserTokensRepository';
import HashProvider from '@modules/users/providers/HashProvider/models/HashProvider';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';

let fakeUsersRepository: FakeUsersRepository;
let fakeUserTokensRepository: FakeUserTokensRepository;
let fakeHashProvider: HashProvider;
let resetPassword: ResetPasswordService;

describe('ResetPasswordService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeUserTokensRepository = new FakeUserTokensRepository();
    fakeHashProvider = new FakeHashProvider();

    resetPassword = new ResetPasswordService(
      fakeUsersRepository,
      fakeUserTokensRepository,
      fakeHashProvider,
    );
    resetPassword.setTranslateFunction(() => 'Error');
  });

  it('should be able to reset the user password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const { token } = await fakeUserTokensRepository.generate(user.id);

    const generatePasswordHash = jest.spyOn(fakeHashProvider, 'generateHash');

    await resetPassword.execute({ token, password: '654321' });

    const updatedUser = await fakeUsersRepository.findById(user.id);

    expect(updatedUser?.password).toBe('654321');
    expect(generatePasswordHash).toHaveBeenCalledWith('654321');
  });

  it('should NOT be able to reset the user password if the token is invalid', async () => {
    await expect(
      resetPassword.execute({ token: 'invalid-token', password: '654321' }),
    ).rejects.toBeInstanceOf(AppException);
  });

  it('should NOT be able to reset the password if users does not exists', async () => {
    const { token } = await fakeUserTokensRepository.generate(
      'invalid-user-id',
    );

    await expect(
      resetPassword.execute({ token, password: '654321' }),
    ).rejects.toBeInstanceOf(AppException);
  });

  it('should NOT be able to reset the user password if the token was generated more than 2 hours ago', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const { token } = await fakeUserTokensRepository.generate(user.id);

    spyOnDateNow(() => {
      const mockedDate = new Date();

      return mockedDate.setHours(mockedDate.getHours() + 3);
    });

    await expect(
      resetPassword.execute({ token, password: '654321' }),
    ).rejects.toBeInstanceOf(AppException);
  });
});
