import React, { Component } from 'react';
import { Card, Table, Input, Popconfirm, message, Icon } from 'antd';

import UserTableHeader from '../../contains/UserTableHeader/UserTableHeader';

import UserService from '../../services/user.service';

import './user.less';

const { Search } = Input;

class User extends Component {
  constructor() {
    super();

    this.state = {
      filter: '',
      userList: [],
      loading: false,
      pagination: {},
    };
  }

  componentWillMount() {
    this._getUserList();
  }

  _getUserList(params = {}) {
    this.setState({ loading: true });
    UserService.getUserList(params).then(({ meta, data }) => {
      if (meta.errorNo === 0) {
        const pagination = { ...this.state.pagination };
        const userList = data.list.map((user) => {
          return {
            ...user,
            name: `${user.loginName}／${user.nickName}`,
          };
        });

        pagination.total = data.count;
        this.setState({
          userList,
          loading: false,
          pagination,
        });
      }
    });
  }

  _resetPwd(params) {
    UserService.resetPwd(params).then(({ meta }) => {
      if (meta.errorNo === 0) {
        message.success(meta.errorInfo);
      }
    });
  }

  _setStatus(params) {
    this.setState({ loading: true });
    UserService.setStatus(params).then(({ meta }) => {
      if (meta.errorNo === 0) {
        message.success(meta.errorInfo);
        const p = {
          pageNum: this.state.pagination.current,
          filter: this.state.filter,
        };
        this._getUserList(p);
      }
    });
  }

  handleTableChange = (pagination) => {
    const { filter, pagination: pager } = { ...this.state };
    pager.current = pagination.current;
    this.setState({
      pagination: pager,
    });
    this._getUserList({
      pageNum: pagination.current,
      filter,
    });
  }

  handleFilterChange = (e) => {
    this.setState({ filter: e.target.value });
  }

  handleInputClear = () => {
    const pager = { ...this.state.pagination };
    pager.current = 1;
    this.setState({
      pagination: pager,
      filter: '',
    });
    const params = { pageNum: 1 };
    this._getUserList(params);
  }

  handleSearch = () => {
    const pager = { ...this.state.pagination };
    pager.current = 1;
    this.setState({
      pagination: pager,
    });
    const params = { pageNum: 1, filter: this.state.filter };
    this._getUserList(params);
  }

  handleReloadTable = () => {
    const { pagination: { current: pageNum }, filter } = this.state;
    const params = { pageNum, filter };
    this._getUserList(params);
  }

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
      // 三个参数 1. text 如果指定dataIndex 则为对应值，若无 则为此item. 2. item。 3. index
      render: ({ id, status }) => {
        return (
          <span>
            <Popconfirm
              title="确定重置该账号密码？"
              onConfirm={() => {
                this._resetPwd({ id });
              }}
            >
              <button className="table-action-btn">重置密码</button>
            </Popconfirm>
            <span className="ant-divider" />
            { status === 0 ? (
              <Popconfirm
                title="确定停用该账号？"
                onConfirm={() => {
                  this._setStatus({ id, status: 1 });
                }}
              >
                <button className="table-action-btn">停用</button>
              </Popconfirm>
            ) : (
              <Popconfirm
                title="确定启用该账号？"
                onConfirm={() => {
                  this._setStatus({ id, status: 0 });
                }}
              >
                <button className="table-action-btn">启用</button>
              </Popconfirm>
            ) }

          </span>
        );
      },
    }];
    const {
      filter, userList, loading, pagination,
    } = this.state;
    const searchSuffix = filter ? <Icon className="search-input-clear" key="clear" type="close-circle" onClick={this.handleInputClear} /> : null;
    return (
      <Card style={{ width: '100%', marginBottom: '20px' }}>
        <div className="card-head-warpper">
          <div className="card-head-title">用户列表</div>
          <div className="card-head-extra">
            <UserTableHeader onReloadTable={this.handleReloadTable} />
          </div>
        </div>
        <div className="card-body-warpper">
          <Table
            rowKey="id"
            dataSource={userList}
            columns={columns}
            loading={loading}
            pagination={pagination}
            onChange={this.handleTableChange}
            title={() => (
              <Search
                value={filter}
                placeholder="请输入登录名／昵称／邮箱／手机"
                suffix={searchSuffix}
                style={{ width: '300px' }}
                onChange={this.handleFilterChange}
                onSearch={this.handleSearch}
              />
            )}
          />
        </div>
      </Card>
    );
  }
}

export default User;
