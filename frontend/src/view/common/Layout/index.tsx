import * as React from 'react';
import {Route, Switch, Redirect, RouteComponentProps} from 'react-router-dom';

import RouteEnum from '~/view/RouteEnum';
import SecretPanel from '~/view/secretPage/Panel';

import Header from '../Header';

export default function Layout({ match }: RouteComponentProps) {
  return (
    <div>
      <Header />
      <div className="body">
        <Switch>
          <Route
            exact={false}
            path={RouteEnum.PsdManagerPage}
            component={SecretPanel}
          />
          <Route path={`${match.url}b/c`} component={SecretPanel} />
          <Redirect from="/" to={RouteEnum.PsdManagerPage} />
        </Switch>
      </div>
    </div>
  );
}
