import { uuid } from 'uuidv4';

import CallTexsRepository from '../repositories/CallTexsRepository';

interface Respose {
  id: string;
  destination: string;
}

class ListDestinationsService {
  private callTexsRepository: CallTexsRepository;

  constructor(callTexsRepository: CallTexsRepository) {
    this.callTexsRepository = callTexsRepository;
  }

  public execute(): Respose[] {
    const callTexs = this.callTexsRepository.all();

    const filterSingleDestinations = callTexs
      .map(callTex => callTex.destination)
      .filter((currentDestination, index, self) => {
        return self.indexOf(currentDestination) === index;
      });

    const destinations = filterSingleDestinations.map(destination => ({
      id: uuid(),
      destination,
    }));

    return destinations;
  }
}

export default ListDestinationsService;
