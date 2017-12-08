import React from 'react';
import TestRenderer from 'react-test-renderer';
import ShallowRenderer from 'react-test-renderer/shallow';

import { Menu } from 'antd';


import DropdownAvatar from './DropdownAvatar';

it('DropdownAvatar Component', () => {
  const menu = (
    <Menu>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">退出登陆</a>
      </Menu.Item>
    </Menu>
  );

  const testRenderer = TestRenderer.create(<DropdownAvatar
    menu={menu}
    placement="bottomRight"
    className="action"
    size="small"
    icon="user"
    username="User"
  />);

  expect(testRenderer.toJSON().children[1]).toBe('User');
  expect(testRenderer.toJSON().props.className.split(' ').indexOf('action') > -1).toEqual(true);
});

it('DropdownAvatar Component 测试ShallowRenderer', () => {
  const menu = (
    <Menu>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">退出登陆</a>
      </Menu.Item>
    </Menu>
  );
  const renderer = new ShallowRenderer();
  renderer.render(<DropdownAvatar
    menu={menu}
    placement="bottomRight"
    className="action"
    size="small"
    icon="user"
    username="User"
  />);
  const result = renderer.getRenderOutput();

  expect(result.props.placement).toBe('bottomRight');
  expect(result.props.overlay).toEqual(menu);
});
