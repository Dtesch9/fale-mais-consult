import AppError from '../error/AppError';

import FakeCallTexsRepository from '../repositories/CallTexsRepository';
import SearchCallTexService from './SearchCallTexService';

let fakeCallTexsRepository: FakeCallTexsRepository;

let searchCallTexService: SearchCallTexService;

describe('SearchCallTexService', () => {
  beforeEach(() => {
    fakeCallTexsRepository = new FakeCallTexsRepository();

    searchCallTexService = new SearchCallTexService(fakeCallTexsRepository);
  });

  it('should be able to search for plan price given origin and destination', () => {
    const priceComparation = searchCallTexService.execute({
      origin_call: '018',
      destination_call: '011',
      time: 200,
      plan: 120,
    });

    expect(priceComparation).toEqual(
      expect.objectContaining({
        plan: 120,
        plan_price: 167.2,
        normal_price: 380,
      }),
    );
  });

  it('should not calculate tex price if plan greater than call time', () => {
    const priceComparation = searchCallTexService.execute({
      origin_call: '011',
      destination_call: '016',
      time: 20,
      plan: 30,
    });

    expect(priceComparation).toEqual(
      expect.objectContaining({
        plan: 30,
        plan_price: 0,
        normal_price: 38,
      }),
    );
  });

  it('should throw an error if origin/destination not found', async () => {
    const result = () => {
      return new Promise(resolve =>
        resolve(
          searchCallTexService.execute({
            origin_call: '0000',
            destination_call: '0000',
            time: 20,
            plan: 30,
          }),
        ),
      );
    };

    await expect(result).rejects.toBeInstanceOf(AppError);
  });

  it('should throw an error if plan does not exists', async () => {
    const result = () => {
      return new Promise(resolve =>
        resolve(
          searchCallTexService.execute({
            origin_call: '011',
            destination_call: '016',
            time: 20,
            plan: 30000,
          }),
        ),
      );
    };

    await expect(result).rejects.toBeInstanceOf(AppError);

    expect(
      searchCallTexService.execute({
        origin_call: '011',
        destination_call: '016',
        time: 20,
        plan: 30,
      }),
    ).toEqual(
      expect.objectContaining({
        plan: 30,
        plan_price: 0,
        normal_price: 38,
      }),
    );

    expect(
      searchCallTexService.execute({
        origin_call: '011',
        destination_call: '017',
        time: 80,
        plan: 60,
      }),
    ).toEqual(
      expect.objectContaining({
        plan: 60,
        plan_price: 37.4,
        normal_price: 136,
      }),
    );

    expect(
      searchCallTexService.execute({
        origin_call: '018',
        destination_call: '011',
        time: 200,
        plan: 120,
      }),
    ).toEqual(
      expect.objectContaining({
        plan: 120,
        plan_price: 167.2,
        normal_price: 380,
      }),
    );
  });
});
