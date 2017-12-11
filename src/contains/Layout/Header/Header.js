import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Layout, Menu, Icon } from 'antd';

import { controlSiderCollapsed } from '../../../actions/app';

import DropdownAvatar from '../../../components/DropdownAvatar/DropdownAvatar';

import './header.less';

const { Header } = Layout;

class HeaderWrap extends Component {
  render() {
    const menu = (
      <Menu style={{ textAlign: 'center' }}>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">个人信息</a>
        </Menu.Item>
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">修改密码</a>
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item>
          <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">退出登陆</a>
        </Menu.Item>
      </Menu>
    );
    const iconType = this.props.collapsed ? 'menu-unfold' : 'menu-fold';

    return (
      <Header className="header">
        <div className="action" onClick={this.props.controlSiderCollapsed.bind(this, !this.props.collapsed)}>
          <Icon type={iconType} style={{ fontSize: '24px', verticalAlign: 'middle', lineHeight: '64px' }} />
        </div>
        <div className="right">
          <DropdownAvatar menu={menu} placement="bottomRight" className="action" size="small" icon="user" username="User" />
        </div>
      </Header>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    collapsed: state.app.collapsed,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    controlSiderCollapsed: (collapsed) => {
      dispatch(controlSiderCollapsed(collapsed));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderWrap);
