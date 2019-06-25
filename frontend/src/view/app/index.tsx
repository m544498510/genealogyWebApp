import * as React from 'react';
import {hot} from 'react-hot-loader';
import {Redirect, Route, RouteComponentProps, Switch} from "react-router";
import AuthRoute from "~/view/common/AuthRoute";
import RouteEnum from '~/view/RouteEnum';

import LoginPage from '../LoginPage';
import Layout from '../common/Layout';
import "./index.less";
import SecretPanel from "~/view/secretPage/Panel";

export const App = () => (
  <div>
    <Switch>
      <Route path={RouteEnum.LoginPage} component={LoginPage} />
      <AuthRoute path={RouteEnum.RootPath} component={AuthComponent} />
    </Switch>
  </div>
);

const AuthComponent = ({ match }: RouteComponentProps) => (
  <Layout
    logo="/asset/logo.png"
    title="May's Zone"
  >
    <Switch>
      <Route
        exact={false}
        path={RouteEnum.PsdManagerPage}
        component={SecretPanel}
      />
      <Route path={`${match.url}b/c`} component={SecretPanel} />
      <Redirect from="/" to={RouteEnum.PsdManagerPage} />
    </Switch>
  </Layout>
);

export default hot(module)(App);
