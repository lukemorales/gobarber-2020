import AppException from '@shared/exceptions/AppException';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import SendForgotPasswordEmailService from '@modules/users/services/SendForgotPasswordEmailService';
import FakeUserTokensRepository from '@modules/users/repositories/fakes/FakeUserTokensRepository';

let fakeUsersRepository: FakeUsersRepository;
let fakeUserTokensRepository: FakeUserTokensRepository;
let fakeMailProvider: FakeMailProvider;
let sendForgotPasswordEmail: SendForgotPasswordEmailService;

describe('SendForgotPasswordEmailService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeUserTokensRepository = new FakeUserTokensRepository();
    fakeMailProvider = new FakeMailProvider();

    sendForgotPasswordEmail = new SendForgotPasswordEmailService(
      fakeUsersRepository,
      fakeUserTokensRepository,
      fakeMailProvider,
    );
    sendForgotPasswordEmail.setTranslateFunction(() => 'Error');
  });

  it('should be able to send the recovery password email to the user', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    await sendForgotPasswordEmail.execute({ email: user.email });

    expect(sendMail).toHaveBeenCalled();
  });

  it('should NOT be able to send the recovery password email to a user that does not exists', async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    await expect(
      sendForgotPasswordEmail.execute({ email: 'wrong.email@example.com' }),
    ).rejects.toBeInstanceOf(AppException);
    expect(sendMail).not.toHaveBeenCalled();
  });

  it('should generate a unique token to be sent into the recovery email', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    const generateToken = jest.spyOn(fakeUserTokensRepository, 'generate');

    await sendForgotPasswordEmail.execute({ email: user.email });

    expect(generateToken).toHaveBeenCalledWith(user.id);
  });
});
