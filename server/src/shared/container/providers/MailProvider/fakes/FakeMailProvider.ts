import MailDTO from '../dtos/MailDTO';
import MailProvider from '../models/MailProvider';

class FakeMailProvider implements MailProvider {
  private mails: MailDTO[] = [];

  public async sendMail({ to, body, subject }: MailDTO) {
    await this.mails.push({ to, body, subject });
  }
}

export default FakeMailProvider;
