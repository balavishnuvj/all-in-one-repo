import { Express } from 'express';

export interface IGlobal {
  navigator: {
    userAgent: string;
  };
}

export declare const global: IGlobal;

export interface IExpressWithHMR extends Express {
  hot?: object;
}

export declare const module: any;
