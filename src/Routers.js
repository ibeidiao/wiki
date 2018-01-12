import React, { Component } from 'react';
import { ConnectedRouter } from 'react-router-redux';
import { Route, Switch, Redirect } from 'react-router-dom';

import Login from '@pages/Login/Login';
import App from '@pages/App/App';
import User from '@pages/User/User';
import Department from '@pages/Department/Department';
import Project from '@pages/Project/Project';
import CreateProject from '@pages/CreateProject/CreateProject';
import ProjectMoreActions from '@pages/ProjectMoreActions/ProjectMoreActions';
import PrivateRoute from '@contains/PrivateRoute/PrivateRoute';


const appChildren = [
  {
    path: '/departments',
    component: Department,
    auth: true,
  },
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
    path: '/projectMoreActions/:id',
    component: ProjectMoreActions,
    auth: true,
  },
  {
    path: '/createProject',
    component: CreateProject,
    auth: true,
  },
  {
    path: '/',
    redirectTo: '/users',
    auth: true,
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
