import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { Layout } from 'antd';

import MyLayout from '../../contains/Layout/Layout';
import Breadcrumb from '../../contains/Breadcrumb/Breadcrumb';

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
      <Router>
        <Layout>
          <Sider />
          <Layout>
            <Header />
            <Content>
              <div className="content-header"><Breadcrumb /></div>
              <div className="content-body">
                <Switch>
                  <Route exact path="/users" component={User} />
                  <Route exact path="/projects" component={Project} />
                  <Route exact path="/createProject" component={CreateProject} />
                  <Route exact path="/" render={() => <Redirect to={{ pathname: '/users' }} />} />
                </Switch>
              </div>
            </Content>
            <Footer />
          </Layout>
        </Layout>
      </Router>
    );
  }
}

export default App;
