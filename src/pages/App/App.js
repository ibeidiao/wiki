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
  constructor() {
    super();

    this.state = {
      siderCollapsed: true,
    };
  }

  handleMenuControl = () => {
    this.setState({
      siderCollapsed: !this.state.siderCollapsed,
    });
  }

  render() {
    return (
      <Layout>
        <Sider collapsed={this.state.siderCollapsed} />
        <Layout>
          <Header collapsed={this.state.siderCollapsed} onMenuControl={this.handleMenuControl} />
          <Content>页面内容</Content>
          <Footer />
        </Layout>
      </Layout>
    );
  }
}

export default App;

