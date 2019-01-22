/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import { Button } from 'antd';
import Link from '../Link';
import Navigation from '../Navigation';
import logoUrl from './logo-small.png';
import logoUrl2x from './logo-small@2x.png';

class Header extends React.Component {
  render() {
    return (
      <div className="root">
        <div className="container">
          <Navigation />
          <Button type="primary">Hello</Button>
          <Link className="brand" to="/">
            <img
              src={logoUrl}
              srcSet={`${logoUrl2x} 2x`}
              width="38"
              height="38"
              alt="React"
            />
            <span className="brandTxt">Your Company</span>
          </Link>
          <div className="banner">
            <h1 className="bannerTitle">React</h1>
            <p className="bannerDesc">Complex web apps made easy</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
