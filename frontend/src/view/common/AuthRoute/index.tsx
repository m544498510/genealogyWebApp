import * as React from 'react';
import {Route, Redirect, RouteProps} from 'react-router-dom';

import { getUserInfo } from '~/utils/authUtils';

export default function AuthRoute(props: RouteProps) {
  const { component: Target, ...rest } = props;
  return (
    <Route
      {...rest}
      render={prop =>
        (getUserInfo() ? (
          <Target {...prop} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: prop.location },
            }}
          />
        ))
      }
    />
  );
}

