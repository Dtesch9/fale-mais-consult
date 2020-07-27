import { uuid } from 'uuidv4';

import CallTexsRepository from '../repositories/CallTexsRepository';

interface Respose {
  id: string;
  origin: string;
}

class ListOriginsService {
  private callTexsRepository: CallTexsRepository;

  constructor(callTexsRepository: CallTexsRepository) {
    this.callTexsRepository = callTexsRepository;
  }

  public execute(): Respose[] {
    const callTexs = this.callTexsRepository.all();

    const filterSingleOrigins = callTexs
      .map(callTex => callTex.origin)
      .filter((currentOrigin, index, self) => {
        return self.indexOf(currentOrigin) === index;
      });

    const origins = filterSingleOrigins.map(origin => ({
      id: uuid(),
      origin,
    }));

    return origins;
  }
}

export default ListOriginsService;
