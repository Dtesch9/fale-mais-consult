import { ObjectID } from 'typeorm';

import CallText from '@modules/callTexs/infra/typeorm/schemas/CallTex';
import seed from '../../../seed.json';

export default (data: typeof seed): CallText[] => {
  return data.map(value => {
    return {
      ...value,
      id: new ObjectID(),
      created_at: new Date(Date.now()),
      updated_at: new Date(Date.now()),
    };
  });
};
