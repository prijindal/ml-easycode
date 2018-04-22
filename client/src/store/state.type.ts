import { GenericState } from '../models/state';
import { Template } from '../models/template';

// TODO: Move this to store folder
export interface State {
  templates: GenericState<Template[]>;
  search: string;
}
