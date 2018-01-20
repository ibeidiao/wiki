import React, { Component } from 'react';
import { Card, Row, Col, Table, Tooltip, Button, Popconfirm, Input, Select, message, Modal, Tag, Badge } from 'antd';

import moment from '@utils/moment';

import ProjectBasicInfo from '@contains/ProjectBasicInfo/ProjectBasicInfo';

import SearchInput from '@components/SearchInput/SearchInput';

import ProjectService from '@services/project.service';
import UserService from '@services/user.service';

import analysis from '@utils/analysis';

import './project-more-actions.less';

const { Option } = Select;

const { confirm } = Modal;

const ButtonGroup = Button.Group;

class ProjectMoreActions extends Component {
  constructor() {
    super();

    this.state = {
      filter: '',
      currMemberList: [],
      allMemberList: [],
      userOptions: [],
      addMemberId: '',
    };
  }

  componentWillMount() {
    this._loadPageData();
  }

  _loadPageData() {
    const { id } = this.props.match.params;
    ProjectService.getProjectDeatil({ id }).then(({ meta, data }) => {
      if (meta.errorNo === 0) {
        const memberList = [...data.memberList];

        this.setState({
          allMemberList: memberList,
          currMemberList: memberList,
        });
      }
    });
    UserService.getUserOptions({}).then(({ meta, data }) => {
      if (meta.errorNo === 0) {
        const userOptions = [...data.options];
        this.setState({ userOptions });
      }
    });
  }

  handleAddMemberClick = () => {
    const { addMemberId } = this.state;
    if (!addMemberId) {
      message.warn('请选择需要添加的用户！');
      return false;
    }
    if (!this.state.allMemberList.every(m => m.userId !== +addMemberId)) {
      message.warn('不能添加已存在于项目中的成员！');
      return false;
    }

    const projectId = this.props.match.params.id;
    const params = {
      userId: +addMemberId,
      projectId,
      type: 0,
    };
    ProjectService.addProjectUserRelation(params).then(({ meta }) => {
      if (meta.errorNo === 0) {
        message.success('新增用户成功');
        this.setState({ addMemberId: '' });
        this._loadPageData();
      }
    });
  }

  handleFilterChange = (e) => {
    const { value } = e.target;
    const memberList = this.state.allMemberList.filter((member) => {
      if (member.loginName.indexOf(value) >= 0 || member.nickName.indexOf(value) >= 0) {
        return true;
      }
      return false;
    });

    this.setState({
      filter: value,
      currMemberList: memberList,
    });
  }

  handleFilterClear = () => {
    const memberList = [...this.state.allMemberList];
    this.setState({
      filter: '',
      currMemberList: memberList,
    });
  }

  handleSelected = (key) => {
    // addMemberId = +key;
    this.setState({ addMemberId: key });
  }

  handleSearch = (value) => {
    const memberList = this.state.allMemberList.filter((member) => {
      if (member.loginName.indexOf(value) >= 0 || member.nickName.indexOf(value) >= 0) {
        return true;
      }
      return false;
    });

    this.setState({
      currMemberList: memberList,
    });
  }

  render() {
    const self = this;
    const columns = [
      {
        title: 'info',
        key: 'info',
        render(item) {
          return (
            <div style={{ padding: '0 20px' }}>
              <div>
                <span style={{ fontWeight: '600' }}>{item.nickName}</span> @{item.loginName}
                { analysis.getUserId() === item.userId ? <Tag style={{ marginLeft: '10px' }} color="#1aaa55">这是你</Tag> : null }
              </div>
              <div style={{ cursor: 'default' }}>加入于 <Tooltip title={moment(item.createTime).format('YYYY-MM-DD HH:mm:ss')}>{moment(item.createTime).fromNow()}</Tooltip></div>
            </div>
          );
        },
      },
      {
        title: 'actions',
        key: 'actions',
        render(item) {
          if (item.type === 1) {
            return (
              <div
                style={{
                  fontSize: '16px',
                  textAlign: 'right',
                  fontWeight: 'bold',
                  paddingRight: '20px',
                }}
              >
                拥有者
              </div>
            );
          }
          return (
            <div style={{ textAlign: 'right', paddingRight: '20px' }}>
              <Popconfirm
                title={`确定将该项目转给${item.nickName}（@${item.loginName}）？`}
                onConfirm={() => {
                  const projectId = self.props.match.params.id;
                  ProjectService.makeOverProject({ projectId, relationId: item.id })
                    .then(({ meta }) => {
                      if (meta.errorNo === 0) {
                        message.success('转让成功！');
                        self._loadPageData();
                      }
                    });
                }}
              >
                <Button style={{ marginRight: '10px' }}>转让</Button>
              </Popconfirm>
              <Popconfirm
                title={`确定将用户${item.nickName}（@${item.loginName}）移出该项目？`}
                onConfirm={() => {
                  ProjectService.removeProjectUserRelation({ id: item.id })
                    .then(({ meta }) => {
                      if (meta.errorNo === 0) {
                        message.success('移除成功！');
                        self._loadPageData();
                      }
                    });
                }}
              >
                <Button type="danger" icon="minus-circle-o">移除</Button>
              </Popconfirm>
            </div>
          );
        },
      },
    ];
    const {
      filter,
      userOptions,
      currMemberList,
      addMemberId,
    } = this.state;
    const options = userOptions.map(item => <Option key={item.id} value={item.id.toString()}>{`${item.nickName} @${item.loginName}`}</Option>);

    return (
      <div className="project-more-actions-page">
        <ProjectBasicInfo projectId={this.props.match.params.id} />
        <Card title={<div><span style={{ verticalAlign: 'middle' }}>成员管理</span><Badge style={{ background: '#2e2e2e', marginLeft: '10px' }} count={this.state.allMemberList.length} /></div>} style={{ marginBottom: '20px' }}>
          <Table
            columns={columns}
            dataSource={currMemberList}
            rowKey="id"
            showHeader={false}
            pagination={false}
            title={(currentPageData) => {
              return (
                <div style={{ display: 'flex' }}>
                  {`符合条件${currentPageData.length}个`}
                  <SearchInput
                    value={filter}
                    placeholder="请输入昵称／账号"
                    style={{
                      width: '300px',
                      paddingRight: 0,
                      paddingLeft: 0,
                      marginLeft: 'auto',
                    }}
                    onChange={this.handleFilterChange}
                    onSearch={this.handleSearch}
                    onClear={this.handleFilterClear}
                  />
                </div>
              );
            }}
            footer={() => {
              return (
                <div style={{}}>
                  <h3 style={{ padding: '0 20px', marginBottom: '5px' }}>通过登录名或昵称寻找用户以添加成员</h3>
                  <p style={{ padding: '0 20px', marginBottom: '10px' }}>你只能寻找并添加存在于WIKI系统中的用户哦！</p>
                  <Select
                    value={addMemberId}
                    style={{ margin: '5px 20px', width: 'calc(100% - 158px)' }}
                    optionFilterProp="children"
                    size="large"
                    notFoundContent="该用户不存在"
                    onSelect={this.handleSelected}
                    showSearch
                  >
                    {options}
                  </Select>
                  <Button size="large" type="primary" onClick={this.handleAddMemberClick}>添加用户</Button>
                </div>
              );
            }}
          />
        </Card>
      </div>
    );
  }
}

export default ProjectMoreActions;
