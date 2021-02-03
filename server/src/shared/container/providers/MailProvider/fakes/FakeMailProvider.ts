import User from '@modules/users/infra/typeorm/entities/User';

import MailProvider from '../models/MailProvider';

interface Mail {
  to: Pick<User, 'name' | 'email'>;
  subject: string;
  body: string;
}
class FakeMailProvider implements MailProvider {
  private mails: Mail[] = [];

  public async sendMail({ to, body, subject }: Mail) {
    await this.mails.push({ to, body, subject });
  }
}

export default FakeMailProvider;
