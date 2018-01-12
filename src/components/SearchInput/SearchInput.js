import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Input, Icon } from 'antd';

import './search-input.less';

const { Search } = Input;

class SearchInput extends Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
  }

  render() {
    const { value } = this.props;
    const { onClear, ...rest } = this.props;
    const suffix = value ? <Icon className="search-input-clear" key="clear" type="close-circle" onClick={onClear} /> : null;
    return (
      <Search
        {...rest}
        suffix={suffix}
      />
    );
  }
}

export default SearchInput;
