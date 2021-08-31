import { UserToken } from '../infra/typeorm/entities/UserToken';

type CreateUserTokenData = {
  user_id: string;
  expires_date: Date;
  refresh_token: string;
};

type FindByUserIdAndRefreshTokenData = {
  user_id: string;
  refresh_token: string;
};

type FindByRefreshTokenData = {
  refresh_token: string;
};

interface IUsersTokensRepository {
  create(data: CreateUserTokenData): Promise<UserToken>;
  delete(userToken: UserToken): Promise<void>;
  findByUserIdAndRefreshToken(
    data: FindByUserIdAndRefreshTokenData,
  ): Promise<UserToken>;
  findByRefreshToken(data: FindByRefreshTokenData): Promise<UserToken>;
}

export {
  IUsersTokensRepository,
  CreateUserTokenData,
  FindByUserIdAndRefreshTokenData,
  FindByRefreshTokenData,
};
