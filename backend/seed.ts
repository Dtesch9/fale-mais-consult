import { Connection, getConnection, getRepository } from 'typeorm';

import createConnection from './src/shared/infra/typeorm';
import CallTex from './src/modules/callTexs/infra/typeorm/schemas/CallTex';

import seed from './seed.json';

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

  const ormRepository = getRepository(CallTex);

  await ormRepository.save(callTexs);

  const mainConnection = getConnection();

  await connection.close();
  await mainConnection.close();
};

run();
