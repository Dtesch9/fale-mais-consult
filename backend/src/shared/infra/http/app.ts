import 'reflect-metadata';

import express, { Express, Request, Response, NextFunction } from 'express';
import 'express-async-errors';

import AppError from '@shared/error/AppError';

import routes from './routes';

import '@shared/container';

class App {
  public app: Express;

  constructor() {
    this.app = express();

    this.middlewares();
    this.routes();
    this.handlerExaption();
  }

  private middlewares() {
    this.app.use(express.json());
  }

  private routes() {
    this.app.use(routes);
  }

  private handlerExaption() {
    this.app.use(
      (err: Error, request: Request, response: Response, _: NextFunction) => {
        if (err instanceof AppError) {
          return response.status(err.statusCode).json({
            status: 'error',
            message: err.message,
          });
        }

        return response.status(500).json({
          status: 'error',
          message: 'Internal server error',
        });
      },
    );
  }
}

export default new App().app;
