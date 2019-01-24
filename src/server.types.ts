import { Express } from 'express';

export interface IExpressWithHMR extends Express {
  hot?: object;
}

export interface IHotNodeModule extends NodeModule {
  hot: {
    accept: (path: string) => void;
  };
}

export interface IGlobal extends NodeJS.Global {
  navigator: {
    userAgent: string;
  };
}
