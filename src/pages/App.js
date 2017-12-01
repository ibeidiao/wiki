import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';

import './App.css';

const { Header, Sider, Content } = Layout;

class App extends Component {
  state = {
    collapsed: false,
    iconStyle: {
      fontSize: 16
    }
  }
  render() {
    let iconStyle = this.state.iconStyle;
    let collapsed = this.state.collapsed;
    return (
      <Layout>
        <Sider 
          trigger={null} 
          collapsed={collapsed}
          style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }}
        >
          <div className="logo" />
          <Menu
            theme="light"
            style={{ height: 'calc(100% - 64px)' }}
          >
            <Menu.Item key="1">
              <Icon type="home" style={iconStyle} />
              <Link to="/home">Home</Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Icon type="user" style={iconStyle} />
              <Link to="/user">User</Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Icon type="area-chart" style={iconStyle} />
              <Link to="/chart">Chart</Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header>

          </Header>
        </Layout>
      </Layout>
    );
  }
}

export default App;
