import AppError from '../error/AppError';
import CallTexsRepository from '../repositories/CallTexsRepository';

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
  }: IRequest): IPriceComparation {
    const parsedKey = `${origin_call}${destination_call}`;

    const callTexs = this.callTexsRepository.all();

    const whiteListOfPlans = [30, 60, 120];

    const planExists = whiteListOfPlans.indexOf(plan);

    if (planExists < 0) {
      throw new AppError('Plan not found', 404);
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
      throw new AppError('Origin/Destination not found', 404);
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
