import ParseMailTemplateDTO from '../dtos/ParseMailTemplateDTO';
import MailTemplateProvider from '../models/MailTemplateProvider';

class FakeMailTemplateProvider implements MailTemplateProvider {
  public async parse({ template }: ParseMailTemplateDTO) {
    return template;
  }
}

export default FakeMailTemplateProvider;
