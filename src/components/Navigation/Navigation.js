/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import Link from '../Link';

class Navigation extends React.Component {
  render() {
    return (
      <div className="root" role="navigation">
        <Link className="link" to="/about">
          About
        </Link>
        <Link className="link" to="/contact">
          Contact
        </Link>
        <span className="spacer"> | </span>
        <Link className="link" to="/login">
          Log in
        </Link>
        <span className="spacer">or</span>
        <Link to="/register">Sign up</Link>
      </div>
    );
  }
}

export default Navigation;
