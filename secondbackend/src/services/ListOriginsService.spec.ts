import FakeCallTexsRepository from '../repositories/CallTexsRepository';
import ListOriginsService from './ListOriginsService';

let fakeCallTexsRepository: FakeCallTexsRepository;

let listOriginsService: ListOriginsService;

describe('ListOriginsService', () => {
  beforeEach(() => {
    fakeCallTexsRepository = new FakeCallTexsRepository();

    listOriginsService = new ListOriginsService(fakeCallTexsRepository);
  });

  it('should be able to list call texs', () => {
    const origins = listOriginsService.execute();

    expect(origins[0]).toHaveProperty('id');
    expect(origins[0]).toHaveProperty('origin');
  });
});
