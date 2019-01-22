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
import { graphql, compose } from 'react-apollo';
import newsQuery from './queries/news.graphql';

class Home extends React.Component {
  static propTypes = {
    data: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      news: PropTypes.arrayOf(
        PropTypes.shape({
          title: PropTypes.string.isRequired,
          link: PropTypes.string.isRequired,
          content: PropTypes.string,
        }),
      ),
    }).isRequired,
  };

  render() {
    const {
      data: { loading, reactjsGetAllNews },
    } = this.props;
    return (
      <div className="root">
        <div className="container">
          <h1>React.js News</h1>
          {loading
            ? 'Loading...'
            : reactjsGetAllNews.map(item => (
                <article key={item.link} className="newsItem">
                  <h1 className="newsTitle">
                    <a href={item.link}>{item.title}</a>
                  </h1>
                  <div
                    className="newsDesc"
                    // eslint-disable-next-line react/no-danger
                    dangerouslySetInnerHTML={{ __html: item.content }}
                  />
                </article>
              ))}
        </div>
      </div>
    );
  }
}

export default compose(graphql(newsQuery))(Home);
