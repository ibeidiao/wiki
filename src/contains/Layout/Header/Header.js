import React, { Component } from 'react';
import { Layout, Avatar, Dropdown, Menu } from 'antd';

import './header.less';

const { Header } = Layout;

class HeaderWrap extends Component {
  render() {
    const menu = (
      <Menu>
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
    return (
      <Header className="header">
        <Dropdown overlay={menu} placement="bottomRight">
          <Avatar style={{ verticalAlign: 'middle' }} size="large" icon="user">USER</Avatar>
        </Dropdown>
      </Header>
    );
  }
}

export default HeaderWrap;
