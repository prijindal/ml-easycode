/* @flow */
import { State } from '../../models/state';
import { type Template } from '../../models/template';
import getTemplates from '../../api/templates';

export class StateTemplates extends State<Template[]> {
  api = getTemplates;
}

const state = new StateTemplates('FETCH_TEMPLATES');

export default state;
