import User from '@modules/users/infra/typeorm/entities/User';

export default interface MailDTO {
  to: Pick<User, 'name' | 'email'>;
  subject: string;
  body: string;
}
