import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Layout } from 'antd';

import MyLayout from '../../contains/Layout/Layout';
import Breadcrumb from '../../contains/Breadcrumb/Breadcrumb';

import Department from '../Department/Department';
import User from '../User/User';
import Project from '../Project/Project';
import CreateProject from '../CreateProject/CreateProject';

import './app.less';

const {
  Content,
  Footer,
} = Layout;

const {
  Header,
  Sider,
} = MyLayout;

class App extends Component {
  render() {
    return (
      <Layout>
        <Sider />
        <Layout>
          <Header />
          <Content>
            <div className="content-header"><Breadcrumb /></div>
            <div className="content-body">
              {/* <Switch>
                <Route exact path="/departments" component={Department} />
                <Route exact path="/users" component={User} />
                <Route exact path="/projects" component={Project} />
                <Route exact path="/createProject" component={CreateProject} />
                <Route exact path="/" render={() => <Redirect to={{ pathname: '/users' }} />} />
              </Switch> */}
              {this.props.routes}
            </div>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default App;
