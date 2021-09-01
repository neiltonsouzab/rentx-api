import { UserToken } from '@modules/accounts/infra/typeorm/entities/UserToken';

import {
  CreateUserTokenData,
  FindByRefreshTokenData,
  FindByUserIdAndRefreshTokenData,
  IUsersTokensRepository,
} from '../IUsersTokensRepositor';

class FakeUsersTokensRepository implements IUsersTokensRepository {
  private usersTokens: UserToken[] = [];

  async create({
    refresh_token,
    expires_date,
    user_id,
  }: CreateUserTokenData): Promise<UserToken> {
    const userToken = new UserToken();

    Object.assign(userToken, {
      refresh_token,
      expires_date,
      user_id,
    });

    this.usersTokens.push(userToken);

    return userToken;
  }

  async delete(userToken: UserToken): Promise<void> {
    const index = this.usersTokens.findIndex(
      findToken => findToken.id === userToken.id,
    );

    this.usersTokens.splice(index, 1);
  }

  async findByUserIdAndRefreshToken({
    user_id,
    refresh_token,
  }: FindByUserIdAndRefreshTokenData): Promise<UserToken> {
    return this.usersTokens.find(
      findToken =>
        findToken.user_id === user_id &&
        findToken.refresh_token === refresh_token,
    );
  }

  async findByRefreshToken({
    refresh_token,
  }: FindByRefreshTokenData): Promise<UserToken> {
    return this.usersTokens.find(
      findToken => findToken.refresh_token === refresh_token,
    );
  }
}

export { FakeUsersTokensRepository };
