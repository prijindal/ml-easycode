import 'muicss/dist/css/mui.css';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './index.css';
import Root from './Root';

import './registerServiceWorker';

ReactDOM.render(
  <Root />,
  document.getElementById('root') as HTMLElement
);
