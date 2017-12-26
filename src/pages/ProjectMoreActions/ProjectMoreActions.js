import React, { Component } from 'react';
import moment from 'moment';

import { Card, Row, Col, Table, Tooltip, Button, Icon, Popconfirm, Input } from 'antd';

import './project-more-actions.less';

const { Search } = Input;

const data = [{
  id: 13,
  nickName: '咸鱼',
  loginName: 'xianyu',
  createTime: '2017-09-10 11:11:11',
  type: 1,
}];

for (let i = 0; i < 10; i += 1) {
  data.push({
    id: i,
    nickName: '咸鱼',
    loginName: 'xianyu',
    createTime: '2017-09-10 11:11:11',
    type: 0
  });
}

class ProjectMoreActions extends Component {
  constructor() {
    super();

    this.state = {
      filter: '',
      project: {
        name: 'WIKI',
      },
    };
  }

  handleFilterChange = (e) => {
    this.setState({ filter: e.target.value });
  }

  handleFilterClear = () => {
    this.setState({ filter: '' });
  }

  render() {
    const columns = [
      {
        title: 'info',
        key: 'info',
        render(item) {
          return (
            <div style={{ padding: '0 20px' }}>
              <p><span style={{ fontWeight: '600' }}>{item.nickName}</span> @{item.loginName}</p>
              <p style={{ cursor: 'default' }}>加入于 <Tooltip title={item.createTime}>{moment(item.createTime, 'YYYY-MM-DD hh:mm:ss').fromNow()}</Tooltip></p>
            </div>
          );
        }
      },
      {
        title: 'actions',
        key: 'actions',
        render(item) {
          if (item.type === 1) {
            return <div style={{ fontSize: '16px', textAlign: 'right', fontWeight: 'bold', paddingRight: '20px' }}>拥有者</div>;
          }
          return (
            <div style={{ textAlign: 'right', paddingRight: '20px' }}>
              <Popconfirm
                title={`确定将该项目转给${item.nickName}（@${item.loginName}）？`}
                onConfirm={() => {
                  console.log('操作成功');
                }}
              >
                <Button style={{ marginRight: '10px' }}>转让</Button>
              </Popconfirm>
              <Popconfirm
                title={`确定将用户${item.nickName}（@${item.loginName}）移出该项目？`}
                onConfirm={() => {
                  console.log('操作成功');
                }}
              >
                <Button type="danger" icon="minus-circle-o">移除</Button>
              </Popconfirm>
            </div>
          );
        }
      }
    ];
    const { project, filter } = this.state;
    const searchSuffix = filter ? <Icon className="search-input-clear" key="clear" type="close-circle" onClick={this.handleFilterClear} /> : null;

    return (
      <div>
        <Card title={`项目名称：${project.name}`} style={{ marginBottom: '24px' }}>
          <Row gutter={16} className="row">
            <Col span={3} className="label-col">拥有者：</Col>
            <Col span={9} className="content-col">咸鱼</Col>
            <Col span={3} className="label-col">创建者：</Col>
            <Col span={9} className="content-col">咸鱼</Col>
          </Row>
          <Row gutter={16} className="row">
            <Col span={3} className="label-col">创建时间：</Col>
            <Col span={9} className="content-col">2017-09-10 11:11:11</Col>
            <Col span={3} className="label-col">最近更新时间：</Col>
            <Col span={9} className="content-col">2017-09-10 11:11:11</Col>
          </Row>
          <Row gutter={16} className="row">
            <Col span={3} className="label-col">项目描述：</Col>
            <Col span={21} className="content-col">这是一个WIKI项目，添加了 看看有没有不对的</Col>
          </Row>
        </Card>
        <Card title="成员管理" style={{ marginBottom: '20px' }}>
          <Table
            columns={columns}
            dataSource={data}
            rowKey="id"
            showHeader={false}
            pagination={false}
            title={(currentPageData) => {
              return (
                <div style={{ display: 'flex' }}>
                  {`项目总人数：${currentPageData.length}个, 符合条件${currentPageData.length}个`}
                  <Search
                    value={filter}
                    placeholder="请输入昵称／账号"
                    suffix={searchSuffix}
                    style={{ width: '300px', paddingRight: 0, paddingLeft: 0, marginLeft: 'auto' }}
                    onChange={this.handleFilterChange}
                  />
                </div>
              );
            }}
            footer={() => {
              return (
                <div style={{}}>
                  <h3 style={{ padding: '0 20px', marginBottom: '5px' }}>通过登录名或昵称寻找用户以添加成员</h3>
                  <p style={{ padding: '0 20px', marginBottom: '10px' }}>你只能寻找并添加存在于WIKI系统中的用户哦！</p>
                  <Input size="large" style={{ margin: '5px 20px', width: 'calc(100% - 158px)' }} />
                  <Button size="large" type="primary">添加用户</Button>
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
