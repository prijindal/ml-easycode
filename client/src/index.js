/* @flow */

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './index.css';
import Root from './Root';

import './registerServiceWorker';

// if (module.hot) {
//   module.hot.accept();
// }

const root = document.getElementById('root');

if (root == null) {
  throw new Error("Can't Find root element");
} else {
  ReactDOM.render(<Root />, root);
}
