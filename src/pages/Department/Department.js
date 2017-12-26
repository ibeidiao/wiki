import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Card, Table, Input, Button, Popconfirm, message, Icon } from 'antd';
import UserTableHeader from '../../contains/UserTableHeader/UserTableHeader';

import UserService from '../../services/user.service';

const { Search } = Input;

class Department extends Component {
  constructor() {
    super();

    this.state = {
      deptList: [],
      loading: false,
    };
  }

  componentWillMount() {
    // this._getUserList();
  }

  render() {
    const columns = [{
      title: '名称',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '描述',
      dataIndex: 'description',
      key: 'description',
    }, {
      title: '操作',
      key: 'action',
      render: ({ id, status }) => {
        return (
          <span>
            { status === 0 ? (
              <Popconfirm
                title="确定停用该部门？"
                onConfirm={() => {
                  this._stopDept({ id });
                }}
              >
                <button className="table-action-btn">停用</button>
              </Popconfirm>
            ) : (
              <Popconfirm
                title="确定启用该部门？"
                onConfirm={() => {
                  this._startDept({ id });
                }}
              >
                <button className="table-action-btn">启用</button>
              </Popconfirm>
            ) }

          </span>
        );
      },
    }];
    return (
      <Card style={{ width: '100%' }}>
        <div className="card-head-warpper">
          <div className="card-head-title">部门列表</div>
          <div className="card-head-extra">
            <UserTableHeader />
          </div>
        </div>
        <div className="card-body-warpper">
          <Table
            rowKey="id"
            dataSource={this.state.deptList}
            columns={columns}
            loading={this.state.loading}
            pagination="false"
          />
        </div>
      </Card>
    );
  }
}

export default Department;
