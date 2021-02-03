/* eslint-disable no-console */
import nodemailer, { Transporter } from 'nodemailer';

import User from '@modules/users/infra/typeorm/entities/User';

import MailProvider from '../models/MailProvider';

interface Mail {
  to: Pick<User, 'name' | 'email'>;
  subject: string;
  body: string;
}

class EtherealMailProvider implements MailProvider {
  private client: Transporter;

  constructor() {
    nodemailer.createTestAccount((err, account) => {
      const transporter = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass,
        },
      });

      this.client = transporter;
    });
  }

  public async sendMail({ to, subject, body }: Mail) {
    const message = await this.client.sendMail({
      from: 'Team GoBarber <team@gobarber.com>',
      to: `${to.name} <${to.email}>`,
      subject,
      text: body,
    });

    console.log('Message sent: %s', message.messageId);
    // Preview only available when sending through an Ethereal account
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
  }
}

export default EtherealMailProvider;
