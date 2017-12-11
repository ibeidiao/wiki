import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({
  component: Component, isAuth: isA, redirectPath: path, ...rest
}) => (
  <Route
    {...rest}
    render={props => (
      isA ? (
        <Component {...props} />
    ) : (
      <Redirect to={{
        pathname: path,
        state: { from: props.location },
      }}
      />
    )
  )}
  />
);

export default PrivateRoute;
