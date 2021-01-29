import MailProvider from '../models/MailProvider';

interface Mail {
  to: string;
  body: string;
}

class FakeMailProvider implements MailProvider {
  private mails: Mail[] = [];

  public async sendMail(to: string, body: string) {
    await this.mails.push({ to, body });
  }
}

export default FakeMailProvider;
