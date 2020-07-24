import FakeCallTexsRepository from '../repositories/fakes/FakeCallTexsRepository';
import ListDestinationsService from './ListDestinationsService';

let fakeCallTexsRepository: FakeCallTexsRepository;

let listDestinationsService: ListDestinationsService;

describe('ListDestinationsService', () => {
  beforeEach(() => {
    fakeCallTexsRepository = new FakeCallTexsRepository();

    listDestinationsService = new ListDestinationsService(
      fakeCallTexsRepository,
    );
  });

  it('should be able to list call texs', async () => {
    const origins = await listDestinationsService.execute();

    expect(origins[0]).toHaveProperty('id');
    expect(origins[0]).toHaveProperty('destination');
  });
});
