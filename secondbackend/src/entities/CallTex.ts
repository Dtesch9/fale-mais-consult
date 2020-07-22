import { uuid } from 'uuidv4';

class CallTex {
  id: string;

  origin: string;

  destination: string;

  value: number;

  constructor({ origin, destination, value }: Omit<CallTex, 'id'>) {
    this.id = uuid();
    this.origin = origin;
    this.destination = destination;
    this.value = value;
  }
}

export default CallTex;
