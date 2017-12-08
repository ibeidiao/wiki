import React, { Component } from 'react';
import { Layout } from 'antd';
import { Route } from 'react-router-dom';

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

const Projects = () => (
  <div>
    This is Project.
  </div>
);

class App extends Component {
  constructor() {
    super();

    this.state = {
      siderCollapsed: true,
    };
  }

  render() {
    return (
      <Layout>
        <Sider collapsed={this.state.siderCollapsed} />
        <Layout>
          <Header />
          <Content>
            <Route path="/projects" component={Projects} />
          </Content>
          <Footer />
        </Layout>
      </Layout>
    );
  }
}

export default App;

