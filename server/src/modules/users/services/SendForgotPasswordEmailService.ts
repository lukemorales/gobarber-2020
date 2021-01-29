import { StatusCodes } from 'http-status-codes';
import { injectable, inject } from 'tsyringe';

import AppException from '@shared/exceptions/AppException';
import BaseService from '@shared/services/Base';
import MailProvider from '@shared/container/providers/MailProvider/models/MailProvider';

import UserRepository from '../repositories/UserRepository';
import UserTokenRepository from '../repositories/UserTokenRepository';

interface Request {
  email: string;
}

@injectable()
class SendForgotPasswordEmailService extends BaseService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: UserRepository,

    @inject('UserTokensRepository')
    private userTokensRepository: UserTokenRepository,

    @inject('MailProvider')
    private mailProvider: MailProvider,
  ) {
    super();
  }

  public async execute({ email }: Request) {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppException(
        this.t('email_not_registered'),
        StatusCodes.NOT_FOUND,
      );
    }

    await this.userTokensRepository.generate(user.id);

    await this.mailProvider.sendMail(email, 'Não esquece a senha, vagabundo');
  }
}

export default SendForgotPasswordEmailService;
