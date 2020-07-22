import AppError from '@shared/error/AppError';
import CallTexsRepository from '../repositories/CallTexsRepository';

interface Request {
  origin_call: string;
  destination_call: string;
  time: number;
  plan: number;
}

interface PriceComparation {
  plan: number;
  plan_price: number;
  normal_price: number;
}

interface ConsultTable {
  [key: string]: number;
}

class SearchCallTexService {
  private callTexsRepository: CallTexsRepository;

  constructor(callTexsRepository: CallTexsRepository) {
    this.callTexsRepository = callTexsRepository;
  }

  public execute({
    origin_call,
    destination_call,
    time,
    plan,
  }: Request): PriceComparation {
    const parsedKey = `${origin_call}${destination_call}`;

    const callTexs = this.callTexsRepository.all();

    const consultTable = callTexs.reduce((consultRow, callTex) => {
      const { origin, destination, value } = callTex;

      const customKey = `${origin}${destination}`;

      Object.assign(consultRow, {
        [customKey]: value,
      });

      return consultRow;
    }, {} as ConsultTable);

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
