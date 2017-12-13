import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import { Layout } from 'antd';

import MyLayout from '../../contains/Layout/Layout';
import Breadcrumb from '../../contains/Breadcrumb/Breadcrumb';

import Member from '../Member/Member';

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
                  <Route path="/members" component={Member} />
                  <Route path="/projects" render={() => <div> this is a project </div>} />
                  <Route exact path="/" render={() => <Redirect to="/members" />} />
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
