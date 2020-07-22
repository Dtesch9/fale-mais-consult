import { Request, Response } from 'express';
import { container } from 'tsyringe';

import SearchCallTexService from '@modules/callTexs/services/SearchCallTexService';
import AppError from '@shared/error/AppError';

class CallTexsController {
  public async index(request: Request, response: Response): Promise<Response> {
    try {
      const { origin, destination, time, plan } = request.query;

      const searchCallTexService = container.resolve(SearchCallTexService);

      const priceCompatarion = await searchCallTexService.execute({
        origin_call: String(origin),
        destination_call: String(destination),
        time: Number(time),
        plan: Number(plan),
      });

      return response.json(priceCompatarion);
    } catch (err) {
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
    }
  }
}

export default CallTexsController;
