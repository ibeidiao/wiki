import React, { Component } from 'react';
import { ConnectedRouter } from 'react-router-redux';
import { Route, Switch, Redirect } from 'react-router-dom';

import Login from './pages/Login/Login';
import App from './pages/App/App';
import User from './pages/User/User';
import PrivateRoute from './contains/PrivateRoute/PrivateRoute';

const Project = () => (
  <div>this is project</div>
);

const appChildren = [
  {
    path: '/users',
    component: User,
    auth: true,
  },
  {
    path: '/projects',
    component: Project,
    auth: true,
  },
  {
    path: '/',
    redirectTo: '/users',
  },
];

const routers = [
  {
    path: '/login',
    component: Login,
    auth: false,
  },
  {
    path: '/',
    component: App,
    auth: true,
    children: appChildren,
  },
];

class Routers extends Component {
  createRoute(Parent, _children, props) {
    const { redirectTo, ...rest } = props;

    if (redirectTo) {
      return (<Parent {...rest} exact render={() => <Redirect to={{ pathname: redirectTo }} />} />);
    }

    if (_children && _children.length) {
      return (
        <Parent {...props} >
          {_children.map(({
              auth, children, ..._rest
            }, key) => {
              const _props = { key, ..._rest };
              if (auth) {
                return (this.createRoute(PrivateRoute, children, _props));
              } else {
                return (this.createRoute(Route, children, _props));
              }
            })}
        </Parent>
      );
    } else {
      return (<Parent {...props} exact />);
    }
  }

  render() {
    return (
      <ConnectedRouter history={this.props.history}>
        <div>
          {this.createRoute(Switch, routers, {})}
          {/** todo 不传Switch */}
          {/* <Switch>
            {routers.map(({
              path, component, exact, auth,
            }) => {
              const _props = { path, component, exact };
              if (auth) {
                return (<PrivateRoute {..._props} />);
              } else {
                return (<Route {..._props} />);
              }
            })}
          </Switch> */}
        </div>
      </ConnectedRouter>
    );
  }
}

export default Routers;
