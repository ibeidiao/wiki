import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { Card, Table, Button, Icon, Input, Checkbox } from 'antd';

import './project.less';

const { Search } = Input;

const data = [];

for (let i = 0; i < 46; i += 1) {
  data.push({
    id: i,
    name: `项目名称${i}`,
    description: `这是一个比较和谐的项目描述${i}`,
    ownerName: `拥有者${i}`,
    updaterName: `更新者${i}`,
    createTime: '2017/02/17',
    modifyTime: '2017-8-12 12:20:19',
  });
}

class Project extends Component {
  constructor() {
    super();

    this.state = {
      filter: '',
    };
  }

  handleFilterChange = (e) => {
    this.setState({ filter: e.target.value });
  }

  handleInputClear = () => {
    this.setState({ filter: '' });
  }

  render() {
    const columns = [
      {
        title: '项目名称',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '项目描述',
        dataIndex: 'description',
        key: 'description',
      },
      {
        title: '拥有者',
        dataIndex: 'ownerName',
        key: 'ownerName',
      },
      {
        title: '创建日期',
        dataIndex: 'createTime',
        key: 'createTime',
      },
      {
        title: '最近一次更新',
        key: 'lastUpdate',
        render({ updaterName, modifyTime }) {
          return <div>{`${updaterName}，${modifyTime}`}</div>;
        }
      },
      {
        title: '操作',
        key: 'action',
        render() {
          return (
            <span>
              <button className="table-action-btn">编辑项目</button>
              <span className="ant-divider" />
              <button className="table-action-btn">更多操作</button>
            </span>
          );
        }
      },
    ];

    const { filter } = this.state;
    const searchSuffix = filter ? <Icon className="search-input-clear" key="clear" type="close-circle" onClick={this.handleInputClear} /> : null;

    return (
      <Card style={{ width: '100%' }}>
        <div className="card-head-warpper">
          <div className="card-head-title">项目列表</div>
          <div className="card-head-extra">
            <Link to="/createProject" href="/createProject"><Button type="dashed"><Icon style={{ marginRight: '10px' }} type="plus" />创建项目</Button></Link>
          </div>
        </div>
        <div className="card-body-warpper">
          <Table
            rowKey="id"
            dataSource={data}
            columns={columns}
            title={() => (
              <div>
                <Checkbox style={{ userSelect: 'none' }}>拥有的</Checkbox>
                <Search
                  value={filter}
                  placeholder="请输入项目名称／拥有者"
                  suffix={searchSuffix}
                  style={{ width: '300px', paddingRight: 0, paddingLeft: 0 }}
                  onChange={this.handleFilterChange}
                  // onSearch={this.handleSearch}
                />
              </div>

            )}
          />
        </div>
      </Card>
    );
  }
}

export default Project;
