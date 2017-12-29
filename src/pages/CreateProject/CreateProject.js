import React, { Component } from 'react';

import { Card } from 'antd';

import AddProjectFrom from '@contains/AddProjectForm/AddProjectForm';

class CreateProject extends Component {
  render() {
    return (
      <Card>
        <AddProjectFrom />
      </Card>
    );
  }
}

export default CreateProject;
