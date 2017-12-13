import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Layout, Menu, Icon } from 'antd';

import Logo from '../../../components/Logo/Logo';

const {
  Sider,
} = Layout;

class SiderWrap extends Component {
  state = {
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
    const { logoStyle } = this.state;
    const { collapsed } = this.props;
    return (
      <Sider
        trigger={null}
        collapsed={collapsed}
        width="240"
        style={{
          overflow: 'auto',
          minHeight: '100vh',
        }}
        className="sider"
      >
        <Logo title={collapsed ? 'w' : 'wiki'} style={logoStyle} />
        <Menu
          theme="dark"
          style={{
            margin: '16px 0',
            lineHeight: '64px',
            height: 'calc(100% - 96px)',
          }}
        >
          <Menu.Item key="3" style={{ padding: '0 24px' }}>
            <Icon type="database" />
            <span>
              项目列表
            </span>
            <Link to="/projects" href="/projects" />
          </Menu.Item>
          <Menu.Item key="4" style={{ padding: '0 24px' }}>
            <Icon type="team" />
            <span>
              用户管理
            </span>
            <Link to="/members" href="/members" />
          </Menu.Item>
        </Menu>
      </Sider>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    collapsed: state.app.collapsed,
  };
};

export default connect(mapStateToProps)(SiderWrap);
