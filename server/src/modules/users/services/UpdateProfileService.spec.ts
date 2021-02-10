import AppException from '@shared/exceptions/AppException';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateProfileService from './UpdateProfileService';
import HashProvider from '../providers/HashProvider/models/HashProvider';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: HashProvider;
let updateProfile: UpdateProfileService;

describe('UpdateProfileService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    updateProfile = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );
    updateProfile.setTranslateFunction(() => 'Error');
  });

  it('should be able to update the user profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    await updateProfile.execute({
      user_id: user.id,
      name: 'Fulano Beltrano',
      email: 'fulanobeltrano@example.com',
    });

    expect(user.name).toBe('Fulano Beltrano');
    expect(user.email).toBe('fulanobeltrano@example.com');
  });

  it('should NOT be able to update the user profile if the user does not exists', async () => {
    await expect(
      updateProfile.execute({
        user_id: 'fake-id',
        name: 'Fulano Beltrano',
        email: 'fulanobeltrano@example.com',
      }),
    ).rejects.toBeInstanceOf(AppException);
  });

  it('should be able to only update the user name while sending the same registered email', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    await updateProfile.execute({
      user_id: user.id,
      name: 'Fulano Beltrano',
      email: 'johndoe@example.com',
    });

    expect(user.name).toBe('Fulano Beltrano');
    expect(user.email).toBe('johndoe@example.com');
  });

  it('should NOT be able to update the email if the email is already registered by another user', async () => {
    const [user] = await Promise.all([
      fakeUsersRepository.create({
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: '123456',
      }),
      fakeUsersRepository.create({
        name: 'Existing John',
        email: 'existingjohn@example.com',
        password: '123456',
      }),
    ]);

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Fulano Beltrano',
        email: 'existingjohn@example.com',
      }),
    ).rejects.toBeInstanceOf(AppException);
  });

  it('should be able to update the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    await updateProfile.execute({
      user_id: user.id,
      name: 'John Doe',
      email: 'johndoe@example.com',
      old_password: '123456',
      password: '654321',
    });

    expect(user.password).toBe('654321');
  });

  it('should NOT be able to update the password if the old password is not provided', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: '654321',
      } as any), // eslint-disable-line @typescript-eslint/no-explicit-any
    ).rejects.toBeInstanceOf(AppException);
  });

  it('should NOT be able to update the password if the old password is not the same value that is currently stored', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'John Doe',
        email: 'johndoe@example.com',
        old_password: 'wrong-old-password',
        password: '654321',
      }),
    ).rejects.toBeInstanceOf(AppException);
  });
});
