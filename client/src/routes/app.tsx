import * as React from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

import TemplatePage from '../screens/template';

const AppComponent = () => (
  <Router>
    <div>
      <Route exact={true} path="/" component={TemplatePage}/>
    </div>
  </Router>
)

export default AppComponent;
