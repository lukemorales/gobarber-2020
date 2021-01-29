import UserToken from '../infra/typeorm/entities/UserToken';

export default interface UserTokenRepository {
  generate(user_id: string): Promise<UserToken>;
}
