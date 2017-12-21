import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';

import routerRules from './routerRules';
import cookieUtils from '../../utils/cookie';

class PrivateRoute extends Component {
  state = {
    isLogin: 0,
    auth: 0,
  }

  componentWillMount() {
    const isLogin = this.isLogin();
    let auth = 0;

    if (isLogin) {
      auth = this.getAuth();
    }

    this.setState({ isLogin, auth });
  }

  // 获取用户权限
  getAuth() {
    const auth = 1;
    return auth;
  }

  // 判断是否已登录
  isLogin() {
    const isLogin = cookieUtils.get('login') ? 1 : 0;
    return isLogin;
  }

  render() {
    const { component, render, ...rest } = this.props;
    const RouteComponent = component !== undefined ? component : render;
    const { path } = { ...rest };

    // if () {
    // }
    const redirectPath = routerRules.check(path, this.state.isLogin, this.state.auth);

    // const RedirectComponent = (_props) => {
    //   let Temp;
    //   switch (redirectPath) {
    //     case '':
    //       Temp = <RouteComponent {..._props} />;
    //       break;
    //     case null:
    //       Temp = null;
    //       break;
    //     default:
    //       Temp = <Redirect to={{ pathname: redirectPath, state: { from: _props.location } }} />;
    //       break;
    //   }

    //   return (Temp);
    // };

    return (
      <Route
        {...rest}
        render={_props => (
          redirectPath === '' ? (
            <RouteComponent {..._props} />
          ) : (
          redirectPath === null ? (
            null
          ) : (
            <Redirect to={{ pathname: redirectPath, state: { from: _props.location } }} />
          ))
        )}
      />
    );
  }
}

export default PrivateRoute;
