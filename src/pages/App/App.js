import React, { Component } from 'react';
import { Layout } from 'antd';

import MyLayout from '../../contains/Layout/Layout';

import './app.less';

const {
  Content,
  Footer,
} = Layout;

const {
  Header,
  Sider,
} = MyLayout;

class App extends Component {
  render() {
    return (
      <Layout>
        <Sider />
        <Layout>
          <Header />
          <Content>页面内容</Content>
          <Footer />
        </Layout>
      </Layout>
    );
  }
}

export default App;

