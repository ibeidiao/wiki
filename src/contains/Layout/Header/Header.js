import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Layout, Menu, Icon, Button } from 'antd';

import cookie from '@utils/cookie';

import { controlSiderCollapsed, getLoginUserInfo, logout } from '@actions/app';

import DropdownAvatar from '@components/DropdownAvatar/DropdownAvatar';

import analysis from '@utils/analysis';

import './header.less';

const { Header } = Layout;

class HeaderWrap extends Component {
  componentWillMount() {
    this.props.getLoginUserInfo(analysis.getUserId());
  }

  handleLogout = () => {
    const { history } = this.props;
    this.props.logout();
    cookie.del('token');
    history.push('/login');
  }

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
          <a rel="noopener noreferrer" onClick={this.handleLogout}>退出登陆</a>
        </Menu.Item>
      </Menu>
    );
    const iconType = this.props.collapsed ? 'menu-unfold' : 'menu-fold';

    const { nickName } = this.props.loginedUser;

    return (
      <Header className="header">
        <div className="action" onClick={this.props.controlSiderCollapsed.bind(this, !this.props.collapsed)}>
          <Icon type={iconType} style={{ fontSize: '24px', verticalAlign: 'middle', lineHeight: '64px' }} />
        </div>
        <div className="right">
          <DropdownAvatar menu={menu} placement="bottomRight" className="action" size="small" icon="user" username={nickName} />
        </div>
      </Header>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    collapsed: state.app.collapsed,
    loginedUser: state.app.loginedUser,
    history: state.root.history,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    controlSiderCollapsed: (collapsed) => {
      dispatch(controlSiderCollapsed(collapsed));
    },
    getLoginUserInfo: (id) => {
      dispatch(getLoginUserInfo(id));
    },
    logout: () => {
      dispatch(logout());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderWrap);
