import * as React from 'react';
import {hot} from 'react-hot-loader';
import {Route, Switch} from "react-router";
import AuthRoute from "~/view/common/AuthRoute";
import RouteEnum from '~/view/RouteEnum';

import LoginPage from '../LoginPage';
import Layout from '../common/Layout';
import "./index.less";

export const App = () => (
  <div>
    <Switch>
      <Route path={RouteEnum.LoginPage} component={LoginPage} />
      <AuthRoute path={RouteEnum.RootPath} component={Layout} />
    </Switch>
  </div>
);

export default hot(module)(App);
