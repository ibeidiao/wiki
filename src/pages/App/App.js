import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Layout } from 'antd';
import { Link } from 'react-router-dom';

import MyLayout from '../../contains/Layout/Layout';

import { INCREASE, DECREASE, GETSUCCESS, REFRESHDATA } from '../../constants';
import { fetchPostsIfNeeded } from '../../actions/department';
import { addLoginCount } from '../../actions/user';

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
    const { departmentList, userLoginCount, addLoginCount, fetchPostsIfNeeded } = this.props;
    console.log('uuuuuu');
    console.log(departmentList);
    console.log(userLoginCount);
    return (
      <Layout>
        <Sider />
        <Layout>
          <Header />
          <Content>
            <ul>
              <li><Link to="/protected">非公开页面</Link></li>
            </ul>
            <button type="button" onClick={() => fetchPostsIfNeeded()}>加载数据</button>
            <button type="button" onClick={() => addLoginCount(3)}>增加登录次数</button>
            <p style={{ textAlign: 'center' }}>{ departmentList.length }</p>
            <p style={{ textAlign: 'center' }}>登录次数：{ userLoginCount }</p>
          </Content>
          <Footer />
        </Layout>
      </Layout>
    );
  }
}

const getList = (state) => {
  return {
    departmentList: state.department.lists,
    userLoginCount: state.user.loginCount
  };
};

export default connect(
  getList,
  { fetchPostsIfNeeded, addLoginCount }
)(App);
