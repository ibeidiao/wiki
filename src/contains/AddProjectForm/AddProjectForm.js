import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Input, Button, Icon, message } from 'antd';

import ProjectService from '../../services/project.service';

const FormItem = Form.Item;

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class AddProjectForm extends Component {
  componentDidMount() {
    // To disabled submit button at the beginning.
    this.props.form.validateFields();
  }

  _createProject(project) {
    const { history } = this.props;
    ProjectService.createProject(project).then(({ meta }) => {
      if (meta.errorNo === 0) {
        message.success(meta.errorInfo);
        history.push('/projects');
      }
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this._createProject(values);
      }
    });
  }

  render() {
    const {
      getFieldDecorator,
      getFieldsError,
      getFieldError,
      isFieldTouched,
    } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 14,
          offset: 6,
        },
      },
    };

    const nameError = isFieldTouched('name') && getFieldError('name');

    const nameInput = getFieldDecorator('name', { rules: [{ required: true, message: '项目名称不能为空' }] })(<Input size="default" placeholder="项目名称" />);
    const descriptionInput = getFieldDecorator('description', { rules: [] })(<Input autosize={{ minRows: 3, maxRows: 6 }} style={{ minWidth: '100%' }} type="textarea" size="default" placeholder="项目描述" />);

    return (
      <Form
        onSubmit={this.handleSubmit}
      >
        <FormItem
          {... formItemLayout}
          label="项目名称"
          validateStatus={nameError ? 'error' : ''}
          help={nameError || ''}
        >
          {nameInput}
        </FormItem>
        <FormItem
          {... formItemLayout}
          label="项目描述"
        >
          {descriptionInput}
        </FormItem>
        <FormItem
          {... tailFormItemLayout}
        >
          <Button size="default" disabled={hasErrors(getFieldsError())} type="primary" htmlType="submit"><Icon type="plus" />创建项目</Button>
        </FormItem>
      </Form>
    );
  }
}

const WrappedAddProjectForm = Form.create()(AddProjectForm);

const mapStateToProps = (state) => {
  return {
    history: state.root.history,
  };
};

export default connect(mapStateToProps)(WrappedAddProjectForm);
