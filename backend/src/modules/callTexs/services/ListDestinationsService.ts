import { inject, injectable } from 'tsyringe';
import { uuid } from 'uuidv4';

import ICallTexsRepository from '../repositories/ICallTexsRepository';

interface IRespose {
  id: string;
  destination: string;
}

@injectable()
class ListDestinationsService {
  constructor(
    @inject('CallTexsRepository')
    private callTexsRepository: ICallTexsRepository,
  ) {}

  public async execute(): Promise<IRespose[]> {
    const callTexs = await this.callTexsRepository.all();

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
