/* @flow */

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import register from './registerServiceWorker';

// if (module.hot) {
//   module.hot.accept();
// }

let root = document.getElementById('root');

if (root == null) {
  throw new Error("Can't Find root element");
} else {
  try {
    ReactDOM.render(<App />, root);
  } catch (e) {
    ReactDOM.render(<div>Some Error Occured</div>, root);
  }
}

register();
