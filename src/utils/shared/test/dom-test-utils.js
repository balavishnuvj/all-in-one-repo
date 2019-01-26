import React from 'react';
import { render } from 'react-testing-library';
import 'jest-styled-components';
import createApolloClient from '../apollo/createApolloClient.server';
import App from '../../../components/App';

const customRender = (node, options) => {
  const client = createApolloClient();
  const context = {
    insertCss: () => {},
    fetch: () => {},
    client,
    pathname: '',
  };
  return render(<App context={context}>{node}</App>, options);
};

// re-export everything
export * from 'react-testing-library';

// override render method
export { customRender as render };
