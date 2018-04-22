import * as React from 'react';
import {
  Route
} from 'react-router-dom';

import TemplatesPage from '../screens/Templates';
import TrainingPage from '../screens/training';

const AppComponent = () => (
  <div>
    <Route exact={true} path="/" component={TemplatesPage}/>
    <Route path="/training" component={TrainingPage}/>
  </div>
)

export default AppComponent;
