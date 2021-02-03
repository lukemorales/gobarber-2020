import User from '@modules/users/infra/typeorm/entities/User';

interface Mail {
  to: Pick<User, 'name' | 'email'>;
  subject: string;
  body: string;
}

export default interface MailProvider {
  sendMail(data: Mail): Promise<void>;
}
