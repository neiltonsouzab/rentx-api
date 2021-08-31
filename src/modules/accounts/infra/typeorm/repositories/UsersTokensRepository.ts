import { getRepository, Repository } from 'typeorm';

import {
  CreateUserTokenData,
  FindByRefreshTokenData,
  FindByUserIdAndRefreshTokenData,
  IUsersTokensRepository,
} from '@modules/accounts/repositories/IUsersTokensRepositor';

import { UserToken } from '../entities/UserToken';

class UsersTokensRepositoty implements IUsersTokensRepository {
  private repository: Repository<UserToken>;

  constructor() {
    this.repository = getRepository(UserToken);
  }

  async create({
    user_id,
    refresh_token,
    expires_date,
  }: CreateUserTokenData): Promise<UserToken> {
    const userToken = this.repository.create({
      user_id,
      refresh_token,
      expires_date,
    });

    return this.repository.save(userToken);
  }

  async delete(userToken: UserToken): Promise<void> {
    await this.repository.delete(userToken);
  }

  async findByUserIdAndRefreshToken({
    user_id,
    refresh_token,
  }: FindByUserIdAndRefreshTokenData): Promise<UserToken> {
    return this.repository.findOne({ user_id, refresh_token });
  }

  async findByRefreshToken({
    refresh_token,
  }: FindByRefreshTokenData): Promise<UserToken> {
    return this.repository.findOne({ refresh_token });
  }
}

export { UsersTokensRepositoty };
