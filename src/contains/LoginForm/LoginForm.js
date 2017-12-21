import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Form, Icon, Input, Button, Checkbox } from 'antd';

import './login-form.less';

const FormItem = Form.Item;

class LoginForm extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    const { history } = this.props;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        history.push('/');
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const userInput = getFieldDecorator('username', { rules: [{ required: true, message: '请输入你的用户名!' }] })(<Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="用户名" />);
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
