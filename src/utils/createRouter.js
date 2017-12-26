import React from 'react';
import { Switch } from 'react-router-dom';

// TODO: 解决默认路由。
// TODO: 三级以上路由处理，可能有一点问题。
// TODO: 重定向问题。
const createRoute = (route, auth, base, Route) => {
  const url = `${base}${route.path}`;
  if (!route.children || !route.children.length) {
    return (
      <Route
        key={url}
        path={url}
        auth={route.auth ? auth : false}
        redirectTo={route.redirectTo}
        exact
        component={route.component}
      />
    );
  }
  return (
    <Route
      key={url}
      path={url}
      auth={route.auth ? auth : false}
      component={route.component}
      routes={createRouter(route.children, auth, url)(Route)}
    />
  );
};

const createRouter = (routes, auth, base = '/') => (Route) => {
  return (
    <Switch>
      {routes.map(route => createRoute(route, auth, base, Route))}
    </Switch>
  );
};

export const mix404 = (routes, path = 'NotFound') => {
  const route = { path: '*', redirectTo: path };

  routes.forEach((r) => {
    if (r.children && r.children.length) {
      r.children.push(route);
      mix404(r.children, path);
    }
  });

  return routes;
};

export default createRouter;
