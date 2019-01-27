/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

/* global __DEV__ */

import path from 'path';
import express from 'express';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import BlueBird from 'bluebird';
import expressJwt, { UnauthorizedError as Jwt401Error } from 'express-jwt';
import { graphql } from 'graphql';
import expressGraphQL from 'express-graphql';
// import jwt from 'jsonwebtoken';
import nodeFetch from 'node-fetch';
import React from 'react';
import ReactDOM from 'react-dom/server';
import PrettyError from 'pretty-error';
import { getDataFromTree } from 'react-apollo';
import { ServerStyleSheet } from 'styled-components';
import App from './components/App.js';
import Html from './components/Html';
import createApolloClient from './utils/shared/apollo/createApolloClient.server';
import { ErrorPageWithoutStyle } from './routes/error/ErrorPage';
import errorPageStyle from './routes/error/ErrorPage.css';
import createFetch from './createFetch';
import passport from './passport';
import router from './router';
import models from './data/models';
import schema from './data/schema';
// import assets from './asset-manifest.json'; // eslint-disable-line import/no-unresolved
// tslint:disable-next-line
import chunks from './chunk-manifest.json'; // eslint-disable-line import/no-unresolved
import config from './config';
import { IExpressWithHMR, IHotNodeModule, IGlobal } from './server.types';

process.on('unhandledRejection', (reason, p) => {
  console.error('Unhandled Rejection at:', p, 'reason:', reason);
  // send entire app down. Process manager will restart it
  process.exit(1);
});

const globalNode: IGlobal = {
  navigator: {
    userAgent: 'all',
  },
  ...global,
};

// @ts-ignore this is global variable
const isDev = __DEV__;
//
// Tell any CSS tooling (such as Material UI) to use all vendor prefixes if the
// user agent is not known.
// -----------------------------------------------------------------------------
globalNode.navigator = globalNode.navigator || { userAgent: 'all' };
// global.navigator.userAgent = global.navigator.userAgent || 'all';

const app: IExpressWithHMR = express();

//
// If you are using proxy from external machine, you can set TRUST_PROXY env
// Default is to trust proxy headers only from loopback interface.
// -----------------------------------------------------------------------------
app.set('trust proxy', config.trustProxy);
//
// Register Node.js middleware
// -----------------------------------------------------------------------------
app.use(express.static(path.resolve(__dirname, 'public')));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//
// Authentication
// -----------------------------------------------------------------------------
app.use(
  expressJwt({
    secret: config.auth.jwt.secret,
    credentialsRequired: false,
    getToken: (req) => req.cookies.id_token,
  }),
);

// Error handler for express-jwt
app.use(
  (
    err: IError,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    // eslint-disable-line no-unused-vars
    if (err instanceof Jwt401Error) {
      console.error('[express-jwt-error]', req.cookies.id_token);
      // `clearCookie`, otherwise user can't use web-app until cookie expires
      res.clearCookie('id_token');
    }
    next(err);
  },
);

app.use(passport.initialize());

//
// Register API middleware
// -----------------------------------------------------------------------------
// https://github.com/graphql/express-graphql#options
const graphqlMiddleware = expressGraphQL((req) => ({
  schema,
  graphiql: isDev,
  rootValue: { request: req },
  pretty: isDev,
}));

app.use('/graphql', graphqlMiddleware);

//
// Register server-side rendering middleware
// -----------------------------------------------------------------------------
app.get('*', async (req, res, next) => {
  const isPageToBeCompletelySSRd = config.ssrEnabledRoutes.includes(req.path);
  const sheet = new ServerStyleSheet();
  try {
    const css = new Set();

    // Enables critical path CSS rendering
    // https://github.com/kriasoft/isomorphic-style-loader
    // @ts-ignore this would be removed later
    const insertCss = (...styles) => {
      // eslint-disable-next-line no-underscore-dangle
      styles.forEach((style) => css.add(style._getCss()));
    };

    const apolloClient = createApolloClient({
      schema,
      rootValue: { request: req },
    });

    // Universal HTTP client
    const fetch = createFetch(nodeFetch, {
      baseUrl: config.api.serverUrl,
      cookie: req.headers.cookie,
      schema,
      graphql,
    });

    // Global (context) variables that can be easily accessed from any React component
    // https://facebook.github.io/react/docs/context.html
    const context = {
      insertCss,
      fetch,
      // The twins below are wild, be careful!
      pathname: req.path,
      query: req.query,
      // Apollo Client for use with react-apollo
      client: apolloClient,
    };

    const route = await router.resolve(context);

    if (route.redirect) {
      res.redirect(route.status || 302, route.redirect);
      return;
    }

    const scripts = new Set();
    const addChunk = (chunk: string) => {
      if (chunks[chunk]) {
        chunks[chunk].forEach((asset: string) => scripts.add(asset));
      } else if (isDev) {
        throw new Error(`Chunk with name '${chunk}' cannot be found`);
      }
    };
    addChunk('client');
    if (route.chunk) {
      addChunk(route.chunk);
    }
    if (route.chunks) {
      route.chunks.forEach(addChunk);
    }

    const data = { ...route };
    if (isPageToBeCompletelySSRd) {
      const rootComponent = <App context={context}>{route.component}</App>;
      await getDataFromTree(rootComponent);
      // this is here because of Apollo redux APOLLO_QUERY_STOP action
      await BlueBird.delay(0);
      data.children = await ReactDOM.renderToString(rootComponent);
      data.styles = [{ id: 'css', cssText: [...css].join('') }];
    }
    data.scripts = Array.from(scripts);
    // Furthermore invoked actions will be ignored, client will not receive them!
    data.app = {
      apiUrl: config.api.clientUrl,
      apolloState: context.client.extract(),
    };
    const jsx = sheet.collectStyles(<Html {...data} />);
    if (isPageToBeCompletelySSRd) {
      //  stream is enabled if page is SSRd. else it would be direct send;
      res.write('<!doctype html>');
      const stream = sheet.interleaveWithNodeStream(
        ReactDOM.renderToStaticNodeStream(jsx),
      );
      stream.pipe(
        res,
        { end: false },
      );
      stream.on('end', () => {
        res.end();
      });
    } else {
      const html = ReactDOM.renderToString(jsx);
      res.send(`<!doctype html>${sheet.getStyleTags()}${html}`);
    }
    res.status(route.status || 200);
  } catch (err) {
    next(err);
  }
});

//
// Error handling
// -----------------------------------------------------------------------------
const pe = new PrettyError();
pe.skipNodeFiles();
pe.skipPackage('express');

// eslint-disable-next-line no-unused-vars
app.use((err: IError, req: express.Request, res: express.Response) => {
  console.error(pe.render(err));
  const html = ReactDOM.renderToStaticMarkup(
    <Html
      title="Internal Server Error"
      description={err.message}
      styles={[{ id: 'css', cssText: errorPageStyle._getCss() }]}
    >
      {ReactDOM.renderToString(<ErrorPageWithoutStyle error={err} />)}
    </Html>,
  );
  res.status(err.status || 500);
  res.send(`<!doctype html>${html}`);
});

//
// Launch the server
// -----------------------------------------------------------------------------
const promise = models.sync().catch((err: IError) => console.error(err.stack));
if (!(module as IHotNodeModule).hot) {
  promise.then(() => {
    app.listen(config.port, () => {
      console.info(`The server is running at http://localhost:${config.port}/`);
    });
  });
}

//
// Hot Module Replacement
// -----------------------------------------------------------------------------
if ((module as IHotNodeModule).hot) {
  app.hot = (module as IHotNodeModule).hot;
  (module as IHotNodeModule).hot.accept('./router');
}

export default app;
