import { Button } from 'muicss/react';
import * as React from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

const TemplatePage = () => (
  <div>
    <Button>Ok</Button>
  </div>
)

const AppComponent = () => (
  <Router>
    <div>
      <Route exact={true} path="/" component={TemplatePage}/>
    </div>
  </Router>
)

export default AppComponent;
