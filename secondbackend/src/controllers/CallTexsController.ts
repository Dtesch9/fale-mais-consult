import { Request, Response } from 'express';

import SearchCallTexService from '../services/SearchCallTexService';
import ListCallPricesService from '../services/ListCallPricesService';
import CallTexsRepository from '../repositories/CallTexsRepository';

const callTexsRepository = new CallTexsRepository();

class CallTexsController {
  public index(request: Request, response: Response): Response {
    const listCallPricesService = new ListCallPricesService(callTexsRepository);

    const callTexs = listCallPricesService.execute();

    return response.json(callTexs);
  }

  public show(request: Request, response: Response): Response {
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
