import { Request, Response } from 'express';

import ListOriginsService from '../services/ListOriginsService';
import CallTexsRepository from '../repositories/CallTexsRepository';

const callTexsRepository = new CallTexsRepository();

class OriginsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listCallPricesService = new ListOriginsService(callTexsRepository);

    const origins = await listCallPricesService.execute();

    return response.json(origins);
  }
}

export default OriginsController;
