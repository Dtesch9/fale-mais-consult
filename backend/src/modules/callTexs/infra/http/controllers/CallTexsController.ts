import { Request, Response } from 'express';

import SearchCallTexService from '@modules/callTexs/services/SearchCallTexService';
import CallTexsRepository from '@modules/callTexs/repositories/CallTexsRepository';

const callTexsRepository = new CallTexsRepository();

class CallTexsController {
  public index(request: Request, response: Response): Response {
    const { origin, destination, time, plan } = request.query;

    const searchCallTexService = new SearchCallTexService(callTexsRepository);

    const priceCompatarion = searchCallTexService.execute({
      origin_call: String(origin),
      destination_call: String(destination),
      time: Number(time),
      plan: Number(plan),
    });

    return response.json(priceCompatarion);
  }
}

export default CallTexsController;
