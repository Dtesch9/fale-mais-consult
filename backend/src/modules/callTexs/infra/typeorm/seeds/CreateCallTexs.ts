import { Connection, getConnection, getMongoRepository } from 'typeorm';

import createConnection from '@shared/infra/typeorm';
import CallTex from '@modules/callTexs/infra/typeorm/schemas/CallTex';

import seed from '../../../../../../seed.json';

const data = seed;

const callTexs = data.map(({ origin, destination, value }) => {
  const callTex = new CallTex();
  callTex.origin = origin;
  callTex.destination = destination;
  callTex.value = value;

  return callTex;
});

let connection: Connection;

const run = async () => {
  connection = await createConnection();

  const ormRepository = getMongoRepository(CallTex);

  await ormRepository.save(callTexs);

  const mainConnection = getConnection();

  await connection.close();
  await mainConnection.close();
};

run();
