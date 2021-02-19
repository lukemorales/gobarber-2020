import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ListProvidersService from '@modules/appointments/services/ListProvidersService';

let fakeUsersRepository: FakeUsersRepository;
let listProviders: ListProvidersService;

describe('ListProvidersService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    listProviders = new ListProvidersService(fakeUsersRepository);
    listProviders.setTranslateFunction(() => 'Error');
  });

  it('should be able to list all the providers', async () => {
    const users = await Promise.all([
      fakeUsersRepository.create({
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: '123456',
      }),
      fakeUsersRepository.create({
        name: 'John Trê',
        email: 'johntre@example.com',
        password: '123456',
      }),
      fakeUsersRepository.create({
        name: 'John Quatre',
        email: 'johnquatre@example.com',
        password: '123456',
      }),
    ]);

    const providers = await listProviders.execute();

    expect(providers.length).toBe(3);
    expect(providers).toEqual(users);
  });

  it('should be able to list all the providers but the informed user id', async () => {
    const [loggedUser, ...users] = await Promise.all([
      fakeUsersRepository.create({
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: '123456',
      }),
      fakeUsersRepository.create({
        name: 'John Trê',
        email: 'johntre@example.com',
        password: '123456',
      }),
      fakeUsersRepository.create({
        name: 'John Quatre',
        email: 'johnquatre@example.com',
        password: '123456',
      }),
    ]);

    const providers = await listProviders.execute({ user_id: loggedUser.id });

    expect(providers.length).toBe(2);
    expect(providers).toEqual(users);
    expect(providers).not.toContain(loggedUser);
  });
});
