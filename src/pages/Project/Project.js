import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { Card, Table, Button, Icon, Input, Checkbox, message, Tooltip } from 'antd';

import moment from '@utils/moment';

import ProjectService from '@services/project.service';

import './project.less';

const { Search } = Input;

class Project extends Component {
  constructor() {
    super();

    this.state = {
      isOwned: false,
      filter: '',
      projectList: [],
      loading: false,
      pagination: {},
    };
  }

  componentWillMount() {
    this._getProjectList();
  }

  _getProjectList(params = {}) {
    this.setState({ loading: true });
    ProjectService.getProjectList(params).then(({ meta, data }) => {
      if (meta.errorNo === 0) {
        const pagination = { ...this.state.pagination };

        pagination.total = data.count;
        this.setState({
          projectList: data.list,
          loading: false,
          pagination,
        });
      }
    });
  }

  handleTableChange = (pagination) => {
    const { isOwned, filter, pagination: pager } = { ...this.state };
    pager.current = pagination.current;
    const ownerId = isOwned ? 10038 : '';
    this.setState({
      pagination: pager,
    });
    this._getProjectList({
      pageNum: pagination.current,
      filter,
      ownerId,
    });
  }

  handleFilterChange = (e) => {
    this.setState({ filter: e.target.value });
  }

  handleSearch = () => {
    const pager = { ...this.state.pagination };
    pager.current = 1;
    const { isOwned, filter } = this.state;
    const ownerId = isOwned ? 10038 : '';
    this.setState({
      pagination: pager,
    });
    const params = { pageNum: 1, ownerId, filter };
    this._getProjectList(params);
  }

  handleInputClear = () => {
    const pager = { ...this.state.pagination };
    pager.current = 1;
    const { isOwned } = this.state;
    const ownerId = isOwned ? 10038 : '';
    this.setState({
      pagination: pager,
      filter: '',
    });
    const params = { pageNum: 1, ownerId };
    this._getProjectList(params);
  }

  handleOwnCheckBoxChange = (e) => {
    const pager = { ...this.state.pagination };
    pager.current = 1;
    this.setState({
      pagination: pager,
      isOwned: e.target.checked,
    });
    const ownerId = e.target.checked ? 10038 : '';
    const params = { pageNum: 1, ownerId };
    this._getProjectList(params);
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
        render(createTime) {
          return moment(createTime).format('YYYY-MM-DD HH:mm:ss');
        }
      },
      {
        title: '最近一次更新',
        key: 'lastUpdate',
        render({ updaterName, modifyTime }) {
          const fromNow = moment(modifyTime).fromNow();
          return <div>{` ${updaterName} 更新于 `}<Tooltip title={moment(modifyTime).format('YYYY-MM-DD HH:mm:ss')}>{fromNow}</Tooltip></div>;
        },
      },
      {
        title: '操作',
        key: 'action',
        render(item) {
          return (
            <span>
              {/*
<button className="table-action-btn" onClick={() => message.warn('正在施工中...')} >编辑项目</button>
              */}
              <Link className="table-action-btn" to={`/projectEdit/${item.id}`}>编辑项目</Link>
              <span className="ant-divider" />
              <Link className="table-action-btn" to={`/projectMoreActions/${item.id}`}>更多操作</Link>
            </span>
          );
        },
      },
    ];

    const {
      filter,
      projectList,
      loading,
      pagination,
      isOwned,
    } = this.state;
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
            dataSource={projectList}
            columns={columns}
            loading={loading}
            pagination={pagination}
            onChange={this.handleTableChange}
            title={() => (
              <div>
                <Checkbox checked={isOwned} onChange={this.handleOwnCheckBoxChange} style={{ userSelect: 'none' }}>拥有的</Checkbox>
                <Search
                  value={filter}
                  placeholder="请输入项目名称／拥有者"
                  suffix={searchSuffix}
                  style={{ width: '300px', paddingRight: 0, paddingLeft: 0 }}
                  onChange={this.handleFilterChange}
                  onSearch={this.handleSearch}
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
