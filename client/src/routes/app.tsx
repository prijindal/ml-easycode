import * as React from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

import TemplatesPage from '../screens/Templates';
import TrainingPage from '../screens/training';

const AppComponent = () => (
  <Router>
    <div>
      <Route exact={true} path="/" component={TemplatesPage}/>
      <Route path="/training" component={TrainingPage}/>
    </div>
  </Router>
)

export default AppComponent;
