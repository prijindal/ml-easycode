import { State } from '../../models/state';
import { Template } from '../../models/template';

class StateTemplates extends State<Template[]> {
  public api() {
    // return fetch('/templates').then(r => r.json());
    return new Promise<Template[]>((resolve) => {
      setTimeout(() => resolve([]), 1000);
    });
  }
}

const state = new StateTemplates('FETCH_TEMPLATES');

export default state;
