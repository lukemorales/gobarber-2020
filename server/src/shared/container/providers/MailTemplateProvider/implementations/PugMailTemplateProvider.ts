import pug from 'pug';
import fs from 'fs';

import ParseMailTemplateDTO from '../dtos/ParseMailTemplateDTO';
import MailTemplateProvider from '../models/MailTemplateProvider';

class PugMailTemplateProvider implements MailTemplateProvider {
  public async parse({ file, variables }: ParseMailTemplateDTO) {
    const templateFileContent = await fs.promises.readFile(file, {
      encoding: 'utf-8',
    });

    const parsedTemplate = pug.compile(templateFileContent);

    return parsedTemplate(variables);
  }
}

export default PugMailTemplateProvider;
