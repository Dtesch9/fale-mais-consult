import express, { Express, Request, Response, NextFunction } from 'express';
import { errors } from 'celebrate';

import AppError from './error/AppError';

import routes from './routes';

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
    this.app.use(errors());
  }

  private handlerExaption() {
    this.app.use(
      (err: Error, request: Request, response: Response, _: NextFunction) => {
        if (err instanceof AppError) {
          return response.status(err.statusCode).json({
            status: 'Error',
            message: err.message,
          });
        }

        return response.status(500).json({
          status: 'Error',
          message: 'Internal server error',
        });
      },
    );
  }
}

export default new App().app;
