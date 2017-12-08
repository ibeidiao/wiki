import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';

import MyLayout from '../../contains/Layout/Layout';
import Logo from '../../components/Logo/Logo';

import './app.less';

const {
  Sider,
  Content,
  Footer,
} = Layout;

const {
  Header,
} = MyLayout;

class App extends Component {
  state = {
    collapsed: false,
    // iconStyle: {
    //   fontSize: 16,
    // },
    logoStyle: {
      color: '#fff',
      font: '40px "Italiana", sans-serif',
      textAlign: 'center',
      height: '64px',
      lineHeight: '64px',
      backgroundColor: '#002140',
    },
  }
  render() {
    const { iconStyle, collapsed, logoStyle } = this.state;

    return (
      <Layout>
        <Sider
          trigger={null}
          collapsed={collapsed}
          width="240"
          style={{
            overflow: 'auto',
            height: '100vh',
          }}
          className="sider"
        >
          <Logo title="wiki" style={logoStyle} />
          <Menu
            theme="dark"
            style={{
              margin: '16px 0',
              lineHeight: '64px',
              height: 'calc(100% - 96px)',
            }}
          >
            <Menu.Item key="3" style={{ padding: '0 24px' }}>
              <Icon type="database" style={iconStyle} />
              项目列表
              <Link to="/login" href="/login" />
            </Menu.Item>
            <Menu.Item key="4" style={{ padding: '0 24px' }}>
              <Icon type="team" style={iconStyle} />
              用户管理
              <Link to="/login" href="/login" />
            </Menu.Item>
          </Menu>
        </Sider>
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

