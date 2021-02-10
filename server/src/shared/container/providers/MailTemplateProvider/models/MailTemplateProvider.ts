import ParseMailTemplateDTO from '../dtos/ParseMailTemplateDTO';

export default interface MailTemplateProvider {
  parse(data: ParseMailTemplateDTO): Promise<string>;
}
