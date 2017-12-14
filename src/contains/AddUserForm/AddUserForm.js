import React, { Component } from 'react';
import { Form, Input, Button, Icon } from 'antd';

const FormItem = Form.Item;

class AddUserForm extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }

  handleCancel = () => {
    this.props.onCancel();
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const loginNameInput = getFieldDecorator('loginName', { rules: [{ required: true, message: '用户名不能为空！' }] })(<Input size="default" placeholder="登录名" />);
    const passwordInput = getFieldDecorator('password', { rules: [{ required: true, message: '密码不能为空' }] })(<Input size="default" placeholder="密码" />);
    return (
      <Form style={{ height: '28px' }} layout="inline" onSubmit={this.handleSubmit}>
        <FormItem>
          {loginNameInput}
        </FormItem>
        <FormItem>
          {passwordInput}
        </FormItem>
        <FormItem >
          <Button size="default" type="primary" htmlType="submit"><Icon type="plus" />添加</Button>
        </FormItem>
        <FormItem >
          <Button size="default" onClick={this.handleCancel}><Icon type="close" />取消</Button>
        </FormItem>
      </Form>
    );
  }
}

const WrappedAddUserForm = Form.create()(AddUserForm);

export default WrappedAddUserForm;
