import CallTexsRepository from '../repositories/CallTexsRepository';
import CallTex from '../entities/CallTex';

class ListCallPricesService {
  private callTexsRepository: CallTexsRepository;

  constructor(callTexsRepository: CallTexsRepository) {
    this.callTexsRepository = callTexsRepository;
  }

  public execute(): CallTex[] {
    const callTexs = this.callTexsRepository.all();

    return callTexs;
  }
}

export default ListCallPricesService;
