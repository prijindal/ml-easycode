/* @flow */

import connect from './connect';
import graphql from './graphql';
import InputParametersScreen from './InputParameters';

export default connect(graphql(InputParametersScreen));
