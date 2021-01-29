import { nanoid } from 'nanoid';

import UserToken from '@modules/users/infra/typeorm/entities/UserToken';

import UserTokenRepository from '../UserTokenRepository';

class FakeUserTokensRepository implements UserTokenRepository {
  private userTokens: UserToken[] = [];

  public async generate(user_id: string) {
    const userToken = new UserToken();

    Object.assign(userToken, { id: nanoid(), token: nanoid(), user_id });

    this.userTokens.push(userToken);

    return userToken;
  }
}

export default FakeUserTokensRepository;
