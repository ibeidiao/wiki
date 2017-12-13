import React, { Component } from 'react';
import { Breadcrumb } from 'antd';
import { Link, withRouter } from 'react-router-dom';

import './breadcrumb.less';

const breadcrumbNameMap = {
  '': '首页',
  '/members': '用户管理',
  '/projects': '项目列表',
};

class BreadcrumbWrap extends Component {
  render() {
    const { location } = this.props;
    const pathSnippets = location.pathname.split('/');
    const extraBreadcrumbItems = pathSnippets.map((_, index) => {
      const url = `${pathSnippets.slice(0, index + 1).join('/')}`;
      if (index === pathSnippets.length - 1) {
        return (
          <Breadcrumb.Item key={url}>
            {breadcrumbNameMap[url]}
          </Breadcrumb.Item>
        );
      }
      return (
        <Breadcrumb.Item key={url}>
          <Link className="link" to={url} href={url}>
            {breadcrumbNameMap[url]}
          </Link>
        </Breadcrumb.Item>
      );
    });
    const breadcrumbItems = [].concat(extraBreadcrumbItems);
    return (
      <Breadcrumb {...this.props} >
        {breadcrumbItems}
      </Breadcrumb>
    );
  }
}

export default withRouter(BreadcrumbWrap);
