import { Request, Response } from 'express';

import ListDestinationsService from '../services/ListDestinationsService';
import CallTexsRepository from '../repositories/CallTexsRepository';

const callTexsRepository = new CallTexsRepository();

class DestinationsService {
  public async index(request: Request, response: Response): Promise<Response> {
    const listCallPricesService = new ListDestinationsService(
      callTexsRepository,
    );

    const destinations = await listCallPricesService.execute();

    return response.json(destinations);
  }
}

export default DestinationsService;
