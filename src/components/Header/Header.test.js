/* eslint-env jest */

import React from 'react';
import renderer from 'react-test-renderer';
import Header from './Header';
import createApolloClient from '../../utils/shared/apollo';

describe('Header', () => {
  test('renders children correctly', () => {
    const client = createApolloClient();
    const wrapper = renderer
      .create(
        <Header
          context={{
            insertCss: () => {},
            fetch: () => {},
            client,
            pathname: '',
          }}
        />,
      )
      .toJSON();

    expect(wrapper).toMatchSnapshot();
  });
});
