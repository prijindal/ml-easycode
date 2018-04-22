import * as React from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

import StepperBar from '../components/StepperBar/StepperBar';
import TemplatesPage from '../screens/Templates';
import TrainingPage from '../screens/training';

const AppComponent = () => (
  <Router>
    <div>
      <StepperBar />
      <Route exact={true} path="/" component={TemplatesPage}/>
      <Route path="/training" component={TrainingPage}/>
    </div>
  </Router>
)

export default AppComponent;
