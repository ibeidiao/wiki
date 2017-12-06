import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';

import Logo from '../../components/Logo/Logo';

import './App.css';
import './style.less';

const { Header, Sider, Content } = Layout;

class App extends Component {
  state = {
    collapsed: false,
    iconStyle: {
      fontSize: 16,
    },
    logoStyle: {
      color: '#fff',
      font: '40px "Italiana", sans-serif',
      textAlign: 'center',
      height: '72px',
      lineHeight: '72px',
    },
  }
  render() {
    const { iconStyle, collapsed, logoStyle } = this.state;
    return (
      <Layout>
        <Layout>

          <Sider
            trigger={null}
            collapsed={collapsed}
            style={{
              overflow: 'auto',
              height: '100vh',
              position: 'fixed',
              left: 0,
            }}
          >
            <Logo title="wiki" style={logoStyle} />
            <Menu
              theme="dark"
              style={{ lineHeight: '64px', height: 'calc(100% - 64px)' }}
            >
              <Menu.Item key="1" title="home">
                <Icon type="user" style={iconStyle} />
                个人资料
                <Link to="/login" href="/login" />
              </Menu.Item>
              <Menu.Item key="2">
                <Icon type="lock" style={iconStyle} />
                修改密码
                <Link to="/login" href="/login" />
              </Menu.Item>
              <Menu.Item key="3">
                <Icon type="database" style={iconStyle} />
                项目列表
                <Link to="/login" href="/login" />
              </Menu.Item>
              <Menu.Item key="4">
                <Icon type="team" style={iconStyle} />
                用户管理
                <Link to="/login" href="/login" />
              </Menu.Item>
            </Menu>
          </Sider>
        </Layout>
        <Layout>
          <Header />
          <Content />
        </Layout>
      </Layout>
    );
  }
}

export default App;

