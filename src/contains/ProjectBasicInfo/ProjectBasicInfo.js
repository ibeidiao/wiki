import React, { Component } from 'react';
import { Card, Input, Tag, Row, Col, Button, Modal, message } from 'antd';

import moment from '@utils/moment';

import ProjectService from '@services/project.service';

const ButtonGroup = Button.Group;

const { confirm } = Modal;

class ProjectBasicInfo extends Component {
  constructor() {
    super();

    this.state = {
      editing: false,
      editProject: {},
      project: {
        id: '--',
        name: '--',
        ownerName: '--',
        creatorName: '--',
        createTime: '--',
        modifyTime: '--',
        description: '--',
      }
    };
  }

  componentWillMount() {
    this._loadData();
  }

  _loadData() {
    const { projectId } = this.props;
    ProjectService.getProjectInfo({ id: projectId }).then(({ meta, data }) => {
      if (meta.errorNo === 0) {
        const project = { ...data };

        this.setState({ project });
      }
    });
  }

  handleNameChange = (e) => {
    const { editProject } = this.state;
    this.setState({
      editProject: { ...editProject, name: e.target.value },
    });
  }

  handleDescriptionChange = (e) => {
    const { editProject } = this.state;
    this.setState({
      editProject: { ...editProject, description: e.target.value },
    });
  }

  handleSaveClick = () => {
    const { editProject } = this.state;
    if (!editProject.name) {
      message.error('项目名不能为空');
      return false;
    }
    ProjectService.editProject(editProject).then(({ meta }) => {
      if (meta.errorNo === 0) {
        message.success(meta.errorInfo);
        this.setState({ editing: false });
        this._loadData();
      }
    });
  }

  handleEnableClick = () => {
    const { id } = this.state.project;
    const self = this;
    confirm({
      title: `确定启用 ${self.state.project.name} 项目？`,
      content: '启用项目会使项目可以进行编辑和查看。',
      onOk() {
        ProjectService.setStatus({ id, status: 0 })
          .then(({ meta }) => {
            if (meta.errorNo === 0) {
              message.success(meta.errorInfo);
              self._loadData();
            }
          });
      },
    });
  }

  handleDisableClick = () => {
    const { id } = this.state.project;
    const self = this;
    confirm({
      title: `确定停用 ${self.state.project.name} 项目？`,
      content: '停用项目会使项目无法再做任何编辑和查看，如需以上功能，需要再次启用。',
      onOk() {
        ProjectService.setStatus({ id, status: 1 })
          .then(({ meta }) => {
            if (meta.errorNo === 0) {
              message.success(meta.errorInfo);
              self._loadData();
            }
          });
      },
    });
  }

  handleEditClick = () => {
    const { id, name, description } = this.state.project;
    this.setState({
      editing: true,
      editProject: { id, name, description },
    });
  }

  render() {
    const { project, editing, editProject } = this.state;
    let buttonG = null;
    if (editing) {
      buttonG = (
        <ButtonGroup>
          <Button type="primary" onClick={this.handleSaveClick}>保存</Button>
          <Button onClick={() => this.setState({ editing: false })}>
            取消
          </Button>
        </ButtonGroup>
      );
    } else if (project.status === 1) {
      buttonG = (
        <ButtonGroup>
          <Button type="primary" onClick={this.handleEnableClick}>启用</Button>
        </ButtonGroup>
      );
    } else if (project.status === 0) {
      buttonG = (
        <ButtonGroup>
          <Button onClick={this.handleEditClick}>编辑</Button>
          <Button onClick={this.handleDisableClick}>停用</Button>
        </ButtonGroup>
      );
    }
    return (
      <Card
        title={editing ?
          (
            <div>
              项目名称：
              <Input
                value={editProject.name}
                style={{ width: '200px' }}
                onChange={this.handleNameChange}
              />
              <Tag style={{ marginLeft: '10px' }}>{project.id}</Tag>
            </div>
          )
            :
          (
            <div>
              {`项目名称：${project.name}`}
              <Tag style={{ marginLeft: '10px' }}>{project.id}</Tag>
            </div>
          )
        }
        extra={buttonG}
        style={{ marginBottom: '24px' }}
      >
        <Row gutter={16} className="row">
          <Col span={3} className="label-col">拥有者：</Col>
          <Col span={9} className="content-col">{project.ownerName}</Col>
          <Col span={3} className="label-col">创建者：</Col>
          <Col span={9} className="content-col">{project.creatorName}</Col>
        </Row>
        <Row gutter={16} className="row">
          <Col span={3} className="label-col">创建时间：</Col>
          <Col span={9} className="content-col">{project.createTime === '--' ? '--' : moment(project.createTime).format('YYYY-MM-DD HH:mm:ss')}</Col>
          <Col span={3} className="label-col">最近更新时间：</Col>
          <Col span={9} className="content-col">{project.createTime === '--' ? '--' : moment(project.modifyTime).format('YYYY-MM-DD HH:mm:ss')}</Col>
        </Row>
        <Row gutter={16} className="row">
          <Col span={3} className="label-col">项目描述：</Col>
          <Col span={21} className="content-col">
            {editing ?
              <Input
                value={editProject.description}
                autosize={{ minRows: 1, maxRows: 3 }}
                style={{ minWidth: '300px' }}
                type="textarea"
                onChange={this.handleDescriptionChange}
              />
              :
              project.description
            }
          </Col>
        </Row>
      </Card>
    );
  }
}

export default ProjectBasicInfo;
