/* @flow */

import { Parameters } from './parameters';

export type Template = {
  id: string,
  title: string,
  about?: string,
  parameters?: Parameters,
};
