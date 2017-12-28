import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';

import App from '../pages/App/App';
import Login from '../pages/Login/Login';
import Department from '../pages/Department/Department';
import User from '../pages/User/User';
import Project from '../pages/Project/Project';
import CreateProject from '../pages/CreateProject/CreateProject';
import ProjectMoreActions from '../pages/ProjectMoreActions/ProjectMoreActions';

import createRouter, { mix404 } from '../utils/createRouter';

class RouteWrap extends Component {
  render() {
    const {
      path,
      auth,
      redirectTo,
      component: RouteComponent,
      routes,
    } = this.props;
    return (
      <Route
        path={path}
        render={(props) => {
          if (typeof redirectTo === 'string') {
            return <Redirect to={redirectTo} />;
          }
          if (!auth) {
            return <RouteComponent {...props} routes={routes} />;
          } else {
            const r = auth(path);
            if (r.allowed) {
              return <RouteComponent {...props} routes={routes} />;
            } else if (r.to) {
              return <Redirect to={r.to} />;
            }
            return null;
          }
        }}
      />
    );
  }
}

const NotFound = () => {
  return <div>404</div>;
};

const routes = [
  {
    path: 'NotFound',
    component: NotFound,
  },
  {
    path: 'login',
    component: Login,
  },
  {
    path: '',
    component: App,
    children: [
      {
        path: '',
        redirectTo: 'users',
      },
      {
        path: 'users',
        component: User,
      },
      {
        path: 'departments',
        component: Department,
      },
      {
        path: 'projects',
        component: Project,
      },
      {
        path: 'createProject',
        component: CreateProject,
      },
      {
        path: 'projectMoreActions/:id',
        component: ProjectMoreActions,
      },
    ],
  },
];

const auth = (path) => {
  if (path) {
    return { allowed: false, to: '/login' };
  }
  return true;
};

export default createRouter(mix404(routes, 'NotFound'), auth)(RouteWrap);
