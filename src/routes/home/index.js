/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import Home from './Home';
import newsQuery from './queries/news.graphql';
import Layout from '../../components/Layout';

async function action({ client }) {
  const data = await client.query({
    query: newsQuery,
  });
  return {
    title: 'React Starter Kit',
    chunks: ['home'],
    component: (
      <Layout>
        <Home news={data.reactjsGetAllNews} />
      </Layout>
    ),
  };
}

export default action;
