import { RouterState } from 'react-router-redux';
import { GenericState } from '../models/state';
import { Template } from '../models/template';

// TODO: Move this to store folder
export interface State {
  router: RouterState;
  templates: GenericState<Template[]>;
  search: string;
  selectedtemplate: string;
}
