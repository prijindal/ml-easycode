import { State } from '../../models/state';
import { Template } from '../../models/template';

export class StateTemplates extends State<Template[]> {
  public api() {
    // return fetch('/templates').then(r => r.json());
    return new Promise<Template[]>((resolve) => {
      setTimeout(() => resolve([{
        id: '1',
        title: '',
      }]), 1000);
    });
  }
}

const state = new StateTemplates('FETCH_TEMPLATES');

export default state;
