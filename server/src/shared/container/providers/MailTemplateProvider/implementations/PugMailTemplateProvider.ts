import pug from 'pug';

import ParseMailTemplateDTO from '../dtos/ParseMailTemplateDTO';
import MailTemplateProvider from '../models/MailTemplateProvider';

class PugMailTemplateProvider implements MailTemplateProvider {
  public async parse({ template, variables }: ParseMailTemplateDTO) {
    const parsedTemplate = pug.compile(template);

    return parsedTemplate(variables);
  }
}

export default PugMailTemplateProvider;
