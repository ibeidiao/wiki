import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';

import routerRules from './routerRules';
import cookieUtils from '../../components/Cookie/utils';

class PrivateRoute extends Component {
  state = {
    type: -1,
  }

  componentWillMount() {
    const type = cookieUtils.get('login') ? 0 : -1;
    this.setState({ type });
  }

  render() {
    const { component, ...rest } = this.props;
    const RouteComponent = component;
    const { path } = { ...rest };
    const { isAuth, redirectPath } = routerRules.check(this.state.type, path);
    return (
      <Route
        {...rest}
        render={_props => (
          isAuth ? (
            <RouteComponent {..._props} />
        ) : (
          <Redirect to={{
            pathname: redirectPath,
            state: { from: _props.location },
          }}
          />
        )
      )}
      />
    );
  }
}

export default PrivateRoute;
