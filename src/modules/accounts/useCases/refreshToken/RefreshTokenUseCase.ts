import { addDays } from 'date-fns';
import { sign, verify } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import auth from '@config/auth';
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepositor';
import { AppError } from '@shared/errors/AppError';

interface IRequest {
  refresh_token: string;
}

interface IPayload {
  sub: string;
  email: string;
}

@injectable()
class RefreshTokenUseCase {
  constructor(
    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,
  ) {}

  async execute({ refresh_token }: IRequest): Promise<string> {
    const { sub: user_id, email } = verify(
      refresh_token,
      auth.refreshTokenSecret,
    ) as IPayload;

    const userToken =
      await this.usersTokensRepository.findByUserIdAndRefreshToken({
        user_id,
        refresh_token,
      });

    if (!userToken) {
      throw new AppError('Refresh token does not exists!');
    }

    await this.usersTokensRepository.delete(userToken);

    const newRefreshToken = sign({ email }, auth.refreshTokenSecret, {
      subject: user_id,
      expiresIn: auth.refreshTokenExpiresIn,
    });

    await this.usersTokensRepository.create({
      user_id,
      refresh_token: newRefreshToken,
      expires_date: addDays(new Date(), 30),
    });

    return newRefreshToken;
  }
}

export { RefreshTokenUseCase };
