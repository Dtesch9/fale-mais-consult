import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListOriginsService from '@modules/callTexs/services/ListOriginsService';

class OriginsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listCallPricesService = container.resolve(ListOriginsService);

    const origins = await listCallPricesService.execute();

    return response.json(origins);
  }
}

export default OriginsController;
