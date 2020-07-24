import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListDestinationsService from '@modules/callTexs/services/ListDestinationsService';

class DestinationsService {
  public async index(request: Request, response: Response): Promise<Response> {
    const listCallPricesService = container.resolve(ListDestinationsService);

    const destinations = await listCallPricesService.execute();

    return response.json(destinations);
  }
}

export default DestinationsService;
