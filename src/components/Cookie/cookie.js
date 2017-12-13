import React, { Component } from 'react';

import cookieUtil from './utils';

export default (WrappedComponent, ...rest) => {
  class NewComponent extends Component {
    state = {
      data: null,
    }

    componentWillMount() {
      let data = '';
      const { type, name, value, option } = rest;
      switch (type) {
        case 'set':
          data = cookieUtil.set(name, value, option);
          break;
        case 'get':
          data = cookieUtil.set(name);
          break;
        case 'del':
          data = cookieUtil.set(name);
          break;
        default:
          throw ('type is illegal');
      }
      this.setState({ data });
    }

    render() {
      return <WrappedComponent data={this.state.data} />;
    }
  }
};
