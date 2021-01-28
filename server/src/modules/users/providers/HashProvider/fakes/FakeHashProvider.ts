import HashProvider from '../models/HashProvider';

class FakeHashProvider implements HashProvider {
  public async generateHash(payload: string) {
    return payload;
  }

  public async compareHash(payload: string, hashed: string) {
    return payload === hashed;
  }
}

export default FakeHashProvider;
