import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { Layout } from 'antd';

import MyLayout from '../../contains/Layout/Layout';

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
              <div>
                <Route path="/members" render={() => <div> this is a member </div>} />
                <Route path="/projects" render={() => <div> this is a project </div>} />
                <Route exact path="/" render={() => <Redirect to="/members"><div> this is a member </div></Redirect>} />
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
