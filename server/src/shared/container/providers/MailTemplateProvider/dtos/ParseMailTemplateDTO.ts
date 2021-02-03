interface TemplateData {
  [key: string]: string | number;
}

export default interface ParseMailTemplateDTO {
  template: string;
  variables: TemplateData;
}
