/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import styledNormalize from 'styled-normalize';
import theme from '../../utils/shared/theme';
import globalStyles from './globalStyles';
import Header from '../Header';
import Feedback from '../Feedback';
import Footer from '../Footer';

const GlobalStyle = createGlobalStyle`
${styledNormalize}
${globalStyles}
`;
class Layout extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  render() {
    const { children } = this.props;
    return (
      <ThemeProvider theme={theme}>
        <div>
          <Header testingProps="Sri Kanya" />
          <GlobalStyle />
          {children}
          <Feedback />
          <Footer />
        </div>
      </ThemeProvider>
    );
  }
}

export default Layout;
