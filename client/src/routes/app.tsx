import * as React from 'react';
import {
  Route
} from 'react-router-dom';

import Loadable from 'react-loadable';
import Loading from '../components/Loading'
import TemplatesPage from '../screens/Templates';

const InputParametersPage = Loadable({
  loader: () => import('../screens/InputParameters'),
  loading: Loading,  
})
const TrainingPage = Loadable({
  loader: () => import('../screens/training'),
  loading: Loading,
});

const AppComponent = () => (
  <div>
    <Route exact={true} path="/" component={TemplatesPage}/>
    <Route path="/inputs" component={InputParametersPage} />
    <Route path="/training" component={TrainingPage}/>
  </div>
)

export default AppComponent;
