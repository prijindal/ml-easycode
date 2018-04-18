import * as React from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

import TemplatePage from '../screens/template';
import TrainingPage from '../screens/training';

const AppComponent = () => (
  <Router>
    <div>
      <Route exact={true} path="/" component={TemplatePage}/>
      <Route path="/training" component={TrainingPage}/>
    </div>
  </Router>
)

export default AppComponent;
