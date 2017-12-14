import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Card, Table, Input, Button, Popconfirm, message, Icon } from 'antd';

import UserTableHeader from '../../contains/UserTableHeader/UserTableHeader';

import './user.less';

const { Search } = Input;

const data = [];
for (let i = 0; i < 46; i += 1) {
  data.push({
    key: i,
    name: `登录名／Edward King ${i}`,
    email: 'xianyu@ibeidao.com',
    mobile: '13777876091',
  });
}

class User extends Component {
  render() {
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
      render: () => { // 三个参数 1. text 如果指定dataIndex 则为对应值，若无 则为此item. 2. item。 3. index
        return (
          <span>
            <Popconfirm
              title="确定重置该账号密码？"
              onConfirm={() => {
                message.success('操作成功');
              }}
            >
              <button className="table-action-btn">重置密码</button>
            </Popconfirm>
            <span className="ant-divider" />
            <Popconfirm
              title="确定停用该账号？"
              onConfirm={() => {
                message.success('操作成功');
              }}
            >
              <button className="table-action-btn">停用</button>
            </Popconfirm>
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
          <Table
            dataSource={data}
            columns={columns}
            showHeader={false}
            title={() => { return <UserTableHeader />; }}
          />
        </div>
      </Card>
    );
  }
}

export default User;
