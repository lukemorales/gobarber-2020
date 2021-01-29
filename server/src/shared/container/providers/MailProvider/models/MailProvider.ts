export default interface MailProvider {
  sendMail(to: string, body: string): Promise<void>;
}
