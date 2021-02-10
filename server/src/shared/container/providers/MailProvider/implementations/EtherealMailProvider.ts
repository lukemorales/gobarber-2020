/* eslint-disable no-console */
import nodemailer, { Transporter } from 'nodemailer';
import { inject, injectable } from 'tsyringe';

import MailProvider from '../models/MailProvider';
import MailDTO from '../dtos/MailDTO';
import MailTemplateProvider from '../../MailTemplateProvider/models/MailTemplateProvider';

@injectable()
class EtherealMailProvider implements MailProvider {
  private client: Transporter;

  constructor(
    @inject('MailTemplateProvider')
    private mailTemplateProvider: MailTemplateProvider,
  ) {
    nodemailer.createTestAccount().then((account) => {
      const transporter = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: { user: account.user, pass: account.pass },
      });

      this.client = transporter;
    });
  }

  public async sendMail({ to, subject, templateData, from }: MailDTO) {
    const message = await this.client.sendMail({
      from: from
        ? `${from.name} <${from.email}>`
        : 'Team GoBarber <team@gobarber.com>',
      to: `${to.name} <${to.email}>`,
      subject,
      html: await this.mailTemplateProvider.parse(templateData),
    });

    console.log('Message sent: %s', message.messageId);
    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
  }
}

export default EtherealMailProvider;
