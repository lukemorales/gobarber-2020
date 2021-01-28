import { compare, hash } from 'bcryptjs';

import HashProvider from '../models/HashProvider';

class BCryptHashProvider implements HashProvider {
  public async generateHash(payload: string) {
    return hash(payload, 8);
  }

  public async compareHash(payload: string, hashed: string) {
    return compare(payload, hashed);
  }
}

export default BCryptHashProvider;
