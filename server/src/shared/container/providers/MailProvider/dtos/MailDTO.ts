import User from '@modules/users/infra/typeorm/entities/User';

import ParseMailTemplateDTO from '../../MailTemplateProvider/dtos/ParseMailTemplateDTO';

type MailContact = Pick<User, 'name' | 'email'>;

export default interface MailDTO {
  to: MailContact;
  from?: MailContact;
  subject: string;
  templateData: ParseMailTemplateDTO;
}
