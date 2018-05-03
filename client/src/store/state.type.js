/* @flow */

import { RouterState } from 'react-router-redux';
import { type Parameters } from '../models/parameters';
// import { type GenericState } from '../models/state';

// TODO: Move this to store folder
export type State = {
  router: RouterState,
  search: string,
  trainfile: File | Object,
  selectedtemplate: string,
  parameters: Parameters,
};
