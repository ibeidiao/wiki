import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';

import DropdownAvatar from '../../../components/DropdownAvatar/DropdownAvatar';

import './header.less';

const { Header } = Layout;

class HeaderWrap extends Component {
  constructor() {
    super();

    this.state = {
      a: true,
    };
  }

  handleMenuCilck = () => {
    console.log(111);
    this.state.a = !this.state.a;
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
          <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">退出登陆</a>
        </Menu.Item>
      </Menu>
    );
    const iconType = this.state.a ? 'menu-unfold' : 'menu-fold';

    return (
      <Header className="header">
        <div className="action">
          <Icon onClick={this.handleMenuCilck} type={iconType} style={{ fontSize: '24px', verticalAlign: 'middle' }} />
        </div>
        <div className="right">
          <DropdownAvatar menu={menu} placement="bottomRight" className="action" size="small" icon="user" username="User" />
        </div>
      </Header>
    );
  }
}

export default HeaderWrap;
