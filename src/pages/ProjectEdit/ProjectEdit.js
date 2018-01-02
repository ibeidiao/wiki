import React, { Component } from 'react';
import { Layout } from 'antd';

import Header from '@contains/Layout/Header/Header';
import Editormd from '@contains/ProjectEdit/Editormd';

import './projectEdit.less';

const {
  Content,
  Footer,
} = Layout;

class ProjectEdit extends Component {
  render() {
    return (
      <Layout>
        <Header />
        <Content style={{ padding: '50px', minHeight: 'calc(100vh - 64px)' }}>
          <Editormd />
        </Content>
      </Layout>
    );
  }
}

export default ProjectEdit;
