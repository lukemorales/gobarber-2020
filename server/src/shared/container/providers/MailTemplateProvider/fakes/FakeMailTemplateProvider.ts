import MailTemplateProvider from '../models/MailTemplateProvider';

class FakeMailTemplateProvider implements MailTemplateProvider {
  public async parse() {
    return 'Mail Content';
  }
}

export default FakeMailTemplateProvider;
