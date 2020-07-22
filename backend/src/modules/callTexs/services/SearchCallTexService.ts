import { injectable, inject } from 'tsyringe';

import AppError from '@shared/error/AppError';
import ICallTexsRepository from '../repositories/ICallTexsRepository';

interface IRequest {
  origin_call: string;
  destination_call: string;
  time: number;
  plan: number;
}

interface IPriceComparation {
  plan: number;
  plan_price: number;
  normal_price: number;
}

interface IConsultTable {
  [key: string]: number;
}

@injectable()
class SearchCallTexService {
  constructor(
    @inject('CallTexsRepository')
    private callTexsRepository: ICallTexsRepository,
  ) {}

  public async execute({
    origin_call,
    destination_call,
    time,
    plan,
  }: IRequest): Promise<IPriceComparation> {
    const parsedKey = `${origin_call}${destination_call}`;

    const callTexs = await this.callTexsRepository.all();

    if (callTexs.length < 1) {
      throw new AppError('No plan registered');
    }

    const consultTable = callTexs.reduce((consultRow, callTex) => {
      const { origin, destination, value } = callTex;

      const customKey = `${origin}${destination}`;

      Object.assign(consultRow, {
        [customKey]: value,
      });

      return consultRow;
    }, {} as IConsultTable);

    const pricePerMinute = consultTable[parsedKey];

    if (!pricePerMinute) {
      throw new AppError('Plan not found', 404);
    }

    if (time <= plan) {
      const normal_price = time * pricePerMinute;

      const priceComparation = {
        plan,
        plan_price: 0,
        normal_price,
      };

      return priceComparation;
    }

    const fee = pricePerMinute * 0.1 + pricePerMinute;

    const excidedTime = time - plan;

    const callPrice = excidedTime * fee;

    const normal_price = time * pricePerMinute;

    const priceComparation = {
      plan,
      plan_price: callPrice,
      normal_price,
    };

    return priceComparation;
  }
}

export default SearchCallTexService;
