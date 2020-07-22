import CallText from '../../infra/typeorm/entities/CallTex';

import initialValue from '../../../../../seed.json';

interface CreateCallTexDTO {
  origin: string;

  destination: string;

  value: number;
}

class CallTextsRepository {
  private callTexts: CallText[];

  constructor() {
    this.callTexts = initialValue;
  }

  public all(): CallText[] {
    return this.callTexts;
  }

  public create({ origin, destination, value }: CreateCallTexDTO): CallText {
    const callText = new CallText({ origin, destination, value });

    this.callTexts.push(callText);

    return callText;
  }
}

export default CallTextsRepository;
