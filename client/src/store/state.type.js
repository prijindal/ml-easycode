/* @flow */

import { RouterState } from 'react-router-redux';
import { Parameters } from '../models/parameters';
// import { type GenericState } from '../models/state';

// TODO: Move this to store folder
export type State = {
  router: RouterState,
  search: string,
  selectedtemplate: string,
  parameters: Parameters,
};
