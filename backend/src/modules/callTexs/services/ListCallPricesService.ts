import { inject, injectable } from 'tsyringe';

import ICallTexsRepository from '../repositories/ICallTexsRepository';
import CallTex from '../infra/typeorm/schemas/CallTex';

@injectable()
class ListCallPricesService {
  constructor(
    @inject('CallTexsRepository')
    private callTexsRepository: ICallTexsRepository,
  ) {}

  public async execute(): Promise<CallTex[]> {
    const callTexs = await this.callTexsRepository.all();

    return callTexs;
  }
}

export default ListCallPricesService;
