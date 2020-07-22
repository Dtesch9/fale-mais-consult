import { container } from 'tsyringe';

import CallTexsRepository from '@modules/callTexs/infra/typeorm/repositories/CallTexsRepository';

import ICallTexsRepository from '@modules/callTexs/repositories/ICallTexsRepository';

container.registerSingleton<ICallTexsRepository>(
  'CallTexsRepository',
  CallTexsRepository,
);
