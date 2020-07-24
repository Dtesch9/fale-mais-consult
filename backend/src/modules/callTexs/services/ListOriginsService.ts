import { inject, injectable } from 'tsyringe';
import { uuid } from 'uuidv4';

import ICallTexsRepository from '../repositories/ICallTexsRepository';

interface IRespose {
  id: string;
  origin: string;
}

@injectable()
class ListOriginsService {
  constructor(
    @inject('CallTexsRepository')
    private callTexsRepository: ICallTexsRepository,
  ) {}

  public async execute(): Promise<IRespose[]> {
    const callTexs = await this.callTexsRepository.all();

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
