/* @flow */

import { RouterState } from 'react-router-redux';
import { type GenericState } from '../models/state';
import { type Template } from '../models/template';

// TODO: Move this to store folder
export type State = {
  router: RouterState;
  templates: GenericState<Template[]>;
  search: string;
  selectedtemplate: string;
}
