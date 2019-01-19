import { merge } from 'lodash';

/** * Queries ** */
import {
  schema as GetAllReactJSNews,
  queries as GetAllReactJSNewsQueries,
  resolvers as GetAllReactJSNewsResolver,
} from './GetAllReactJSNews';

export const schema = [...GetAllReactJSNews];

export const queries = [...GetAllReactJSNewsQueries];

export const resolvers = merge(GetAllReactJSNewsResolver);
