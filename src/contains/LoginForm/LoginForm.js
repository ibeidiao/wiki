import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Base64 } from 'js-base64';

import { Form, Icon, Input, Button, Checkbox, message } from 'antd';

import UserService from '@services/user.service';

import cookie from '@utils/cookie';

import './login-form.less';

const FormItem = Form.Item;

class LoginForm extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    const { history } = this.props;
    this.props.form.validateFields((err, values) => {
      const { loginName, password, remember } = values;
      if (!err) {
        UserService.login({ loginName, password }).then(({ meta, data }) => {
          if (meta.errorNo === 0) {
            let expireTime;
            if (remember) {
              expireTime = new Date(new Date().getTime() + (365 * 24 * 60 * 60 * 1000));
            } else {
              expireTime = new Date(new Date().getTime() + (24 * 60 * 60 * 1000));
            }
            cookie.set('token', Base64.encode(JSON.stringify(data)), { expires: expireTime });
            message.success(meta.errorInfo);
            history.push('/');
          }
        });
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const userInput = getFieldDecorator('loginName', { rules: [{ required: true, message: '请输入你的用户名!' }] })(<Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="用户名" />);
    const passwordInput = getFieldDecorator('password', { rules: [{ required: true, message: '请输入你的密码!' }] })(<Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="密码" />);
    const rememberChecked = getFieldDecorator('remember', { valuePropName: 'checked', initialValue: true })(<Checkbox>记住我</Checkbox>);

    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem>
          { userInput }
        </FormItem>
        <FormItem>
          { passwordInput }
        </FormItem>
        <FormItem>
          { rememberChecked }
          <a className="login-form-forgot" href="/login">忘记密码？</a>
          <Button type="primary" htmlType="submit" className="login-form-button">
            登陆
          </Button>
        </FormItem>
      </Form>
    );
  }
}

const WrappedLoginForm = Form.create()(LoginForm);

const mapStateToProps = (state) => {
  return {
    history: state.root.history,
  };
};

export default connect(mapStateToProps)(WrappedLoginForm);
