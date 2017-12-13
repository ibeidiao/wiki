import React, { Component } from 'react';
import { Card, Table, Icon, Input } from 'antd';

import './member.less';

const { Column, ColumnGroup } = Table;
const { Search } = Input;

const data = [];
for (let i = 0; i < 46; i++) {
  data.push({
    key: i,
    name: `登录名／Edward King ${i}`,
    email: 'xianyu@ibeidao.com',
    mobile: '13777876091',
  });
}


class Member extends Component {
  render() {
    console.log('render');
    const columns = [{
      title: '登录名／昵称',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
    }, {
      title: '手机',
      dataIndex: 'mobile',
      key: 'mobile',
    }, {
      title: '操作',
      key: 'action',
      render: (item) => {
        return (
          <span>
            <a href="#">重置密码</a>
            <span className="ant-divider" />
            <a href="#">停用</a>
          </span>
        );
      },
    }];
    return (
      <Card style={{ width: '100%' }}>
        <div className="card-head-warpper">
          <div className="card-head-title">用户列表</div>
          <div className="card-head-extra">
            <Search size="large" placeholder="请输入登录名／昵称／邮箱／手机" style={{ width: '300px' }} onSearch={value => console.log(value)} />
          </div>
        </div>
        <div className="card-body-warpper">
          <Table dataSource={data} columns={columns} />
        </div>
      </Card>
    );
  }
}

export default Member;
