import FakeCallTexsRepository from '../repositories/fakes/FakeCallTexsRepository';
import ListOriginsService from './ListOriginsService';

let fakeCallTexsRepository: FakeCallTexsRepository;

let listOriginsService: ListOriginsService;

describe('ListOriginsService', () => {
  beforeEach(() => {
    fakeCallTexsRepository = new FakeCallTexsRepository();

    listOriginsService = new ListOriginsService(fakeCallTexsRepository);
  });

  it('should be able to list call texs', async () => {
    const origins = await listOriginsService.execute();

    expect(origins[0]).toHaveProperty('id');
    expect(origins[0]).toHaveProperty('origin');
  });
});
