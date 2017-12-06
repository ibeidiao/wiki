import React, { Component } from 'react';

import PropTypes from 'prop-types';

import './logo.less';

class Logo extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    imgSrc: PropTypes.string,
    style: PropTypes.object,
  }

  static defaultProps = {
    imgSrc: '',
    style: {},
  }

  render() {
    const { title, imgSrc, style } = this.props;
    const defaultStyle = { userSelect: 'none' };
    return (
      <div title={title} style={{ ...defaultStyle, ...style }}>
        {imgSrc ? <img alt={title} src={imgSrc} /> : title}
      </div>
    );
  }
}

export default Logo;
