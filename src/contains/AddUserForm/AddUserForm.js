import React, { Component } from 'react';
import { Form, Input, Button, Icon, message } from 'antd';

import UserService from '@services/user.service';

const FormItem = Form.Item;

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class AddUserForm extends Component {
  componentDidMount() {
    // To disabled submit button at the beginning.
    this.props.form.validateFields();
  }

  _addUser(user) {
    UserService.addUser(user).then(({ meta }) => {
      if (meta.errorNo === 0) {
        message.success(meta.errorInfo);
        this.props.onAddUser();
      } else {
        message.error(meta.errorInfo);
      }
      this.handleCancel();
    });
  }

  _checkLoginNameUnique(rule, value, callback) { // TODO: 异步验证怎么做节流。
    if (!value) { return callback(); }
    UserService.checkLoginNameUnique({ loginName: value })
      .then(({ meta }) => {
        if (meta.errorNo === 0) {
          return callback();
        } else {
          return callback(meta.errorInfo);
        }
      });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this._addUser(values);
      }
    });
  }

  handleCancel = () => {
    this.props.onCancel();
  }

  render() {
    const {
      getFieldDecorator,
      getFieldsError,
      getFieldError,
      isFieldTouched,
    } = this.props.form;

    const loginNameError = isFieldTouched('loginName') && getFieldError('loginName');
    const passwordError = isFieldTouched('password') && getFieldError('password');

    const loginNameInput = getFieldDecorator('loginName', { rules: [{ required: true, message: '用户名不能为空！' }, { validator: this._checkLoginNameUnique }] })(<Input size="default" placeholder="登录名" />);
    const passwordInput = getFieldDecorator('password', { rules: [{ required: true, message: '密码不能为空' }] })(<Input size="default" type="password" placeholder="密码" />);

    return (
      <Form style={{ height: '28px' }} layout="inline" onSubmit={this.handleSubmit}>
        <FormItem validateStatus={loginNameError ? 'error' : ''} help={loginNameError || ''}>
          {loginNameInput}
        </FormItem>
        <FormItem validateStatus={passwordError ? 'error' : ''} help={passwordError || ''}>
          {passwordInput}
        </FormItem>
        <FormItem >
          <Button size="default" disabled={hasErrors(getFieldsError())} type="primary" htmlType="submit"><Icon type="plus" />添加</Button>
        </FormItem>
        <FormItem style={{ marginRight: 0 }}>
          <Button size="default" onClick={this.handleCancel}><Icon type="close" />取消</Button>
        </FormItem>
      </Form>
    );
  }
}

const WrappedAddUserForm = Form.create()(AddUserForm);

export default WrappedAddUserForm;
