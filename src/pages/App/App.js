import React, { Component } from 'react';
import { Layout } from 'antd';

import MyLayout from '@contains/Layout/Layout';
import Breadcrumb from '@contains/Breadcrumb/Breadcrumb';

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
          <Content>
            <div className="content-header"><Breadcrumb /></div>
            <div className="content-body">
              {/* {this.props.routes} */}
              {this.props.children}
            </div>
          </Content>
          <Footer />
        </Layout>
      </Layout>
    );
  }
}

export default App;
