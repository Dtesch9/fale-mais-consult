import { ObjectID } from 'mongodb';
import { ObjectID as MongoIdType } from 'typeorm';

import CallText from '@modules/callTexs/infra/typeorm/schemas/CallTex';
import seed from '../../../seed.json';

export default (data: typeof seed): CallText[] => {
  return data.map(value => {
    const id = new ObjectID();

    return {
      ...value,
      id: id as MongoIdType,
      created_at: new Date(Date.now()),
      updated_at: new Date(Date.now()),
    };
  });
};
