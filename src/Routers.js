import React, { Component } from 'react';
import { ConnectedRouter } from 'react-router-redux';
import { Route, Switch } from 'react-router-dom';

import Login from './pages/Login/Login';
import App from './pages/App/App';
import User from './pages/User/User';
import PrivateRoute from './contains/PrivateRoute/PrivateRoute';

const Project = () => (
  <div>this is project</div>
);

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

const appChildren = [
  {
    path: '/users',
    component: User,
    auth: true,
  },
  {
    path: '/project',
    component: Project,
    auth: true,
  },
];

class Routers extends Component {
  makeRoute(Parent, children) {
    if (children && children.length) {
      return (
        <Parent>
          {children.map(({
              path, component, auth, _children,
            }) => {
              const _props = { path, component };
              if (auth) {
                return (this.makeRoute(<PrivateRoute {..._props} />), _children);
              } else {
                return (this.makeRoute(<Route {..._props} />), _children);
              }
            })}
        </Parent>
      );
    } else {
      return (<Parent />);
    }
  }

  render() {
    return (
      <ConnectedRouter history={this.props.history}>
        <div>
          {this.makeRoute(<Switch />, routers)}
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
