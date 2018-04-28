/* @flow */

import connect from './connect';
import graphql from './graphql';
import TemplatesScreen from './Templates';

export default graphql(connect(TemplatesScreen));
