import '@babel/polyfill';
import * as React from 'react';
import {render} from 'react-dom';
import { Provider } from 'react-redux';
import {History} from "history";

import store from './core/store';
import RouteEnum from './view/RouteEnum';

import App from './view/app';
import BrowserRouter, {getHistory} from './view/common/BrowserRouter';
import {setProps} from "~/utils/ajaxUtil";

setProps((response) => {
  const history: History = getHistory();
  if (response.status === 401) {
    history.push(RouteEnum.LoginPage);
  }
});

render(
  (
    <Provider store={store}>
      <BrowserRouter>
        <App/>
      </BrowserRouter>
    </Provider>
  ),
  document.getElementById('root')
);
