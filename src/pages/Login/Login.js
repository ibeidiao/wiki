import React, { Component } from 'react';

import Logo from '@components/Logo/Logo';
import LoginForm from '@contains/LoginForm/LoginForm';

import './login.less';

class Login extends Component {
  render() {
    return (
      <div className="login-wrap">
        <Logo title="wiki" style={{ font: '9rem "Italiana", sans-serif', textAlign: 'center' }} />
        <LoginForm />
      </div>
    );
  }
}

export default Login;
