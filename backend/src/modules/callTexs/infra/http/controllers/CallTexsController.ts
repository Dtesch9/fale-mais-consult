import { Request, Response } from 'express';
import { container } from 'tsyringe';

import SearchCallTexService from '@modules/callTexs/services/SearchCallTexService';

class CallTexsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { origin, destination, time, plan } = request.query;

    const searchCallTexService = container.resolve(SearchCallTexService);

    const priceCompatarion = await searchCallTexService.execute({
      origin_call: String(origin),
      destination_call: String(destination),
      time: Number(time),
      plan: Number(plan),
    });

    return response.json(priceCompatarion);
  }
}

export default CallTexsController;
