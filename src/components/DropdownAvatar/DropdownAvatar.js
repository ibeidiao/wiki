import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Avatar, Dropdown } from 'antd';

class DropdownAvatar extends Component {
  static propTypes = {
    menu: PropTypes.object.isRequired,
    className: PropTypes.string,
    placement: PropTypes.oneOf(['bottomLeft', 'bottomCenter', 'bottomRight', 'topLeft', 'topCenter', 'topRight']),
    trigger: PropTypes.arrayOf(PropTypes.string),
    size: PropTypes.oneOf(['small', 'large', 'default']),
    icon: PropTypes.string,
    username: PropTypes.string,
  }

  static defaultProps = {
    className: '',
    placement: 'bottomLeft',
    trigger: ['hover'],
    size: 'default',
    icon: '',
    username: '',
  }

  render() {
    const {
      menu,
      className,
      placement,
      trigger,
      size,
      icon,
      username,
    } = this.props;
    return (
      <Dropdown overlay={menu} placement={placement} trigger={trigger}>
        <div className={className}>
          <Avatar style={{ verticalAlign: 'middle' }} size={size} icon={icon} />
          {username}
        </div>
      </Dropdown>
    );
  }
}

export default DropdownAvatar;
