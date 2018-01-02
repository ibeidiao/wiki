import React, { Component } from 'react';
import { ConnectedRouter } from 'react-router-redux';
import { Route, Switch, Redirect } from 'react-router-dom';

import Login from './pages/Login/Login';
import App from './pages/App/App';
import User from './pages/User/User';
import Department from './pages/Department/Department';
import Project from './pages/Project/Project';
import CreateProject from './pages/CreateProject/CreateProject';
import ProjectMoreActions from './pages/ProjectMoreActions/ProjectMoreActions';
import ProjectEdit from './pages/ProjectEdit/ProjectEdit';
import PrivateRoute from './contains/PrivateRoute/PrivateRoute';

const NotFind = () => (
  <div>404 not find</div>
);

const appChildren = [
  {
    path: '/departments',
    component: Department,
    // auth: true,
  },
  {
    path: '/users',
    component: User,
    // auth: true,
  },
  {
    path: '/projects',
    component: Project,
    // auth: true,
  },
  {
    path: '/projectMoreActions/:id',
    component: ProjectMoreActions,
  },
  {
    path: '/createProject',
    component: CreateProject,
  },
  {
    path: '/',
    redirectTo: '/users',
  },
];

const routers = [
  {
    path: '/404',
    component: NotFind,
  },
  {
    path: '/login',
    component: Login,
    auth: false,
  },
  {
    path: '/projectEdit/:id',
    component: ProjectEdit,
  },
  {
    path: '/',
    component: App,
    auth: true,
    children: appChildren,
  },
];

const pushRouteNotFind = (routes) => {
  routes.push({
    path: '*',
    redirectTo: '/404',
  });
  return routes;
};

class Routers extends Component {
  createRoute(route, key) {
    const {
      auth,
      redirectTo,
      children,
      ...rest
    } = route;

    if (redirectTo) {
      return (
        <Route key={key} exact render={() => <Redirect to={{ pathname: redirectTo }} />} />
      );
    }

    let MyRoute = null;

    if (auth) {
      MyRoute = PrivateRoute;
    } else {
      MyRoute = Route;
    }

    if (children && children.length) {
      return (
        <MyRoute key={key} {...rest}>
          {this.createRoutes(pushRouteNotFind(children))}
        </MyRoute>
      );
    } else {
      return (
        <MyRoute key={key} exact {...rest} />
      );
    }
  }

  createRoutes(routes) {
    return (
      <Switch>
        {routes.map((route, key) => {
          return this.createRoute(route, key);
        })}
      </Switch>
    );
  }

  render() {
    return (
      <ConnectedRouter history={this.props.history}>
        <div>
          {this.createRoutes(routers)}
        </div>
      </ConnectedRouter>
    );
  }
}

export default Routers;
