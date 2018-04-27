/* @flow */

import * as React from 'react';
import {
  Route
} from 'react-router-dom';

import Loadable from 'react-loadable';
import Loading from '../components/Loading'
import InputParametersPage from '../screens/InputParameters';
import TemplatesPage from '../screens/Templates';
import TrainingPage from '../screens/training';

const AppComponent = () => (
  <div>
    <Route exact={true} path="/" component={TemplatesPage}/>
    <Route path="/inputs" component={InputParametersPage} />
    <Route path="/training" component={TrainingPage}/>
  </div>
)

export default AppComponent;
