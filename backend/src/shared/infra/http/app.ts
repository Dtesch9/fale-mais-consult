import 'reflect-metadata';

import express, { Express } from 'express';

import routes from './routes';

import '@shared/container';

class App {
  public app: Express;

  constructor() {
    this.app = express();

    this.middlewares();
    this.routes();
  }

  private middlewares() {
    this.app.use(express.json());
  }

  private routes() {
    this.app.use(routes);
  }
}

export default new App().app;
