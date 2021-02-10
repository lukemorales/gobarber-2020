import MailDTO from '../dtos/MailDTO';
import MailProvider from '../models/MailProvider';

class FakeMailProvider implements MailProvider {
  private mails: MailDTO[] = [];

  public async sendMail(message: MailDTO) {
    await this.mails.push(message);
  }
}

export default FakeMailProvider;
