import '@babel/polyfill';
import * as React from 'react';
import {render} from 'react-dom';
import { Provider } from 'react-redux';

import store from './core/store';
import App from './view/app';

render(
  (
    <Provider store={store}>
      <App/>
    </Provider>
  ),
  document.getElementById('root')
);
