import FakeCallTexsRepository from '../repositories/fakes/FakeCallTexsRepository';
import ListCallPricesService from './ListCallPricesService';

let fakeCallTexsRepository: FakeCallTexsRepository;

let listCallPricesService: ListCallPricesService;

describe('ListCallPricesService', () => {
  beforeEach(() => {
    fakeCallTexsRepository = new FakeCallTexsRepository();

    listCallPricesService = new ListCallPricesService(fakeCallTexsRepository);
  });

  it('should be able to list call texs', async () => {
    const callTexs = await listCallPricesService.execute();

    expect(callTexs).toHaveLength(6);
    expect(callTexs[0]).toHaveProperty('id');
    expect(callTexs[5].origin).toBeTruthy();
    expect(callTexs[5].destination).toBeTruthy();
    expect(callTexs[5].value).toBeTruthy();
  });
});
