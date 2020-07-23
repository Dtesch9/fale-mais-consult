import AppError from '@shared/error/AppError';

import FakeCallTexsRepository from '../repositories/fakes/FakeCallTexsRepository';
import SearchCallTexService from './SearchCallTexService';

let fakeCallTexsRepository: FakeCallTexsRepository;

let searchCallTexService: SearchCallTexService;

describe('SearchCallTexService', () => {
  beforeEach(() => {
    fakeCallTexsRepository = new FakeCallTexsRepository();

    searchCallTexService = new SearchCallTexService(fakeCallTexsRepository);
  });

  it('should be able to search for plan price given origin and destination', async () => {
    const priceComparation = await searchCallTexService.execute({
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

  it('should not calculate tex price if plan greater than call time', async () => {
    const priceComparation = await searchCallTexService.execute({
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
    await expect(
      searchCallTexService.execute({
        origin_call: '0000',
        destination_call: '0000',
        time: 20,
        plan: 30,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should throw an error if plan does not exists', async () => {
    await expect(
      searchCallTexService.execute({
        origin_call: '011',
        destination_call: '016',
        time: 20,
        plan: 300000,
      }),
    ).rejects.toBeInstanceOf(AppError);

    await expect(
      searchCallTexService.execute({
        origin_call: '011',
        destination_call: '016',
        time: 20,
        plan: 30,
      }),
    ).resolves.toEqual(
      expect.objectContaining({
        plan: 30,
        plan_price: 0,
        normal_price: 38,
      }),
    );

    await expect(
      searchCallTexService.execute({
        origin_call: '011',
        destination_call: '017',
        time: 80,
        plan: 60,
      }),
    ).resolves.toEqual(
      expect.objectContaining({
        plan: 60,
        plan_price: 37.4,
        normal_price: 136,
      }),
    );

    await expect(
      searchCallTexService.execute({
        origin_call: '018',
        destination_call: '011',
        time: 200,
        plan: 120,
      }),
    ).resolves.toEqual(
      expect.objectContaining({
        plan: 120,
        plan_price: 167.2,
        normal_price: 380,
      }),
    );
  });
});
