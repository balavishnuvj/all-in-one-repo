/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

/* eslint-env jest */

import * as React from 'react';
import { render } from '../../../utils/shared/test/dom-test-utils';
import Layout from '../Layout';

test('renders children correctly', () => {
  // Arrange
  const { container } = render(
    <Layout>
      <div className="child" />
    </Layout>,
  );

  // Act
  // Assert
  // snapshots work great with regular DOM nodes!
  expect(container.firstChild).toMatchSnapshot();
});
