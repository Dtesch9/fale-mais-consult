import { MongoRepository, getMongoRepository } from 'typeorm';

import CallText from '@modules/callTexs/infra/typeorm/schemas/CallTex';
import ICallTexsRepository from '../../../repositories/ICallTexsRepository';
import CreateCallTexDTO from '../../../dtos/CreateCallTexDTO';

class CallTextsRepository implements ICallTexsRepository {
  private ormRepository: MongoRepository<CallText>;

  constructor() {
    this.ormRepository = getMongoRepository(CallText);
  }

  public async all(): Promise<CallText[]> {
    return this.ormRepository.find();
  }

  public async create({
    origin,
    destination,
    value,
  }: CreateCallTexDTO): Promise<CallText> {
    const callText = this.ormRepository.create({
      origin,
      destination,
      value,
    });

    await this.ormRepository.save(callText);

    return callText;
  }
}

export default CallTextsRepository;
