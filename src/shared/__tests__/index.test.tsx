import * as React from 'react';
import * as renderer from 'react-test-renderer';
import { App } from '../index';

test('Renders without crashing', () => {
  const component = renderer.create(
    <App />,
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});
