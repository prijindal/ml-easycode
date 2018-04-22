import * as React from 'react';
import {
  Route
} from 'react-router-dom';

import asyncComponent from '../components/AsyncComponent';

const TemplatesPage = asyncComponent(() => import('../screens/Templates'));
const InputParametersPage = asyncComponent(() => import('../screens/InputParameters'));
const TrainingPage = asyncComponent(() => import('../screens/training'));

const AppComponent = () => (
  <div>
    <Route exact={true} path="/" component={TemplatesPage}/>
    <Route path="/inputs" component={InputParametersPage} />
    <Route path="/training" component={TrainingPage}/>
  </div>
)

export default AppComponent;
