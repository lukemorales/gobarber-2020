import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';

import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';
import UpdateUserAvatarService from './UpdateUserAvatarService';

describe('UpdateUserAvatarService', () => {
  it('should be able to upload a new avatar for the user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const fakeStorageProvider = new FakeStorageProvider();

    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
    const updateUserAvatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider,
    );

    const { user } = await createUser.execute({
      name: 'John Doe',
      email: 'jonhdoe@example.com',
      password: '123456',
    });

    const response = await updateUserAvatar.execute({
      filename: 'new_avatar.png',
      user_id: user.id,
    });

    expect(response).toHaveProperty('avatar');
    expect(response.avatar).toBe('new_avatar.png');
  });

  it('should be able to upload a new avatar for the user, replace and delete the old one', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const fakeStorageProvider = new FakeStorageProvider();

    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
    const updateUserAvatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider,
    );

    const { user } = await createUser.execute({
      name: 'John Doe',
      email: 'jonhdoe@example.com',
      password: '123456',
    });

    await updateUserAvatar.execute({
      filename: 'old_avatar.png',
      user_id: user.id,
    });

    const response = await updateUserAvatar.execute({
      filename: 'new_avatar.png',
      user_id: user.id,
    });

    expect(response.avatar).toBe('new_avatar.png');
    expect(deleteFile).toHaveBeenCalledWith('old_avatar.png');
  });

  it('should NOT be able to upload a new avatar if the user does not exists', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeStorageProvider = new FakeStorageProvider();

    const updateUserAvatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider,
    );

    expect(
      updateUserAvatar.execute({
        filename: 'new_avatar.png',
        user_id: 'wrong-id',
      }),
    ).rejects.toBeInstanceOf(Error);
  });
});
