import MailDTO from '../dtos/MailDTO';

export default interface MailProvider {
  sendMail(data: MailDTO): Promise<void>;
}
