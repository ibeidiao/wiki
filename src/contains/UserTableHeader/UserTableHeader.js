import React, { Component } from 'react';
import { Button, Icon } from 'antd';

import AddUserForm from '../AddUserForm/AddUserForm';

class UserTableHeader extends Component {
  constructor() {
    super();

    this.state = {
      showAddUserForm: false,
    };
  }

  onCancel = () => {
    this.setState({ showAddUserForm: false });
  }

  handleAddClick = () => {
    this.setState({ showAddUserForm: true });
  }

  render() {
    const { showAddUserForm } = this.state;
    const button = <Button onClick={this.handleAddClick} type="dashed"><Icon style={{ marginRight: '10px' }} type="plus" />添加用户</Button>;
    return (
      <div style={{ textAlign: 'right' }}>
        { showAddUserForm ? <AddUserForm onCancel={this.onCancel} /> : button }
      </div>
    );
  }
}

export default UserTableHeader;
