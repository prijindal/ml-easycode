import { getFirestore } from '../../helpers/firebase';
// import { demoTemplates } from '../../demodata/templates';
import { State } from '../../models/state';
import { Template } from '../../models/template';

export class StateTemplates extends State<Template[]> {
  public async api() {
    const db = await getFirestore();
    // return fetch('/templates').then(r => r.json());
    const querySnaphot = await db.collection('templates').get();
    const templates:Template[] = [];
    querySnaphot.forEach((template) => {
      const templateData = template.data();
      templates.push({
        id: template.id,
        title: templateData.title,
        about: templateData.about,
      });
    })
    return templates;
  }
}

const state = new StateTemplates('FETCH_TEMPLATES');

export default state;
