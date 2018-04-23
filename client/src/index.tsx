import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './index.css';
import Root from './Root';

import './registerServiceWorker';

if (module.hot) {
  module.hot.accept();
}

ReactDOM.render(
  <Root />,
  document.getElementById('root') as HTMLElement
);
