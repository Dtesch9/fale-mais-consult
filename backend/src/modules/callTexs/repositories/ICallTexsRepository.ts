import CallText from '@modules/callTexs/infra/typeorm/schemas/CallTex';
import CreateCallTexDTO from '@modules/callTexs/dtos/CreateCallTexDTO';

export default interface ICallTexsRepository {
  all(): Promise<CallText[]>;
  create(data: CreateCallTexDTO): Promise<CallText>;
}
