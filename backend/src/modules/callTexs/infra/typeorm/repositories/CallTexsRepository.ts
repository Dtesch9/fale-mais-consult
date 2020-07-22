import CallText from '@modules/callTexs/infra/typeorm/entities/CallTex';
import ICallTexsRepository from '../../../repositories/ICallTexsRepository';
import CreateCallTexDTO from '../../../dtos/CreateCallTexDTO';

import initialValue from '../../../../../../seed.json';

class CallTextsRepository implements ICallTexsRepository {
  private callTexts: CallText[];

  constructor() {
    this.callTexts = initialValue;
  }

  public async all(): Promise<CallText[]> {
    return this.callTexts;
  }

  public async create({
    origin,
    destination,
    value,
  }: CreateCallTexDTO): Promise<CallText> {
    const callText = new CallText({ origin, destination, value });

    this.callTexts.push(callText);

    return callText;
  }
}

export default CallTextsRepository;
