interface TemplateData {
  [key: string]: string | number;
}

export default interface ParseMailTemplateDTO {
  file: string;
  variables: TemplateData;
}
