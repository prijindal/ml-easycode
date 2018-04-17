import { Template } from '../models/template';

export function filterTemplates(templates: Template[], str: string): Template[] {
  str = str.trim();
  if(str === "") {
    return templates;
  }
  return templates.filter((template) => template.title.includes(str));
}
