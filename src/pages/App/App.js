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
  MySider,
} = MyLayout;

class App extends Component {
  state = {
    siderCollapsed: true,
  }
  render() {
    return (
      <Layout>
        <MySider collapsed={this.state.siderCollapsed} />
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

