import React from 'react';
import TestRenderer from 'react-test-renderer';

import Logo from './Logo';

it('Logo Component 测试只传入title和style', () => {
  const testRenderer = TestRenderer.create(<Logo title="wiki" style={{ fontSize: '20rem' }} />);
  const testInstance = testRenderer.root;

  expect(testInstance.props.title).toBe('wiki');
  expect(testInstance.props.style).toEqual({ fontSize: '20rem' });
  expect(testRenderer.toJSON().children).toEqual(['wiki']);
});

it('Logo Component 测试传入imgSrc,title和style', () => {
  const testRenderer = TestRenderer.create(<Logo title="测试" style={{ lineHeight: '2rem', fontSize: '20rem' }} imgSrc="/img.png" />);
  const testInstance = testRenderer.root;

  expect(testInstance.props.title).toBe('测试');
  expect(testInstance.props.style).toEqual({ lineHeight: '2rem', fontSize: '20rem' });
  expect(testInstance.findByType('img').props.src).toBe('/img.png');
  expect(testInstance.findByType('img').props.alt).toBe('测试');
});
