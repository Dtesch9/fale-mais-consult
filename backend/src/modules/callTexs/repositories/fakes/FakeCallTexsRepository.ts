import { ObjectID } from 'mongodb';

import filterSeed from '@shared/utils/filterSeed';
import CallText from '../../infra/typeorm/schemas/CallTex';

import data from '../../../../../seed.json';

interface CreateCallTexDTO {
  origin: string;

  destination: string;

  value: number;
}

class CallTextsRepository {
  private callTexts: CallText[];

  constructor() {
    const initialValue = filterSeed(data);

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
    const callText = new CallText();

    Object.assign(callText, {
      id: new ObjectID(),
      origin,
      destination,
      value,
    });

    this.callTexts.push(callText);

    return callText;
  }
}

export default CallTextsRepository;
