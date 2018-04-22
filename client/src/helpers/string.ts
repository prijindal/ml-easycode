import { Template } from '../models/template';

function compare(a: string, b: string) {
  return a.toLowerCase().includes(b);
}

export function filterTemplates(templates: Template[], str: string): Template[] {
  str = str.trim();
  str = str.toLowerCase();
  if(str === "") {
    return templates;
  }
  templates = templates.filter(
    (template) => compare(template.title, str) || compare(template.about, str)
  );
  return templates;
}
