import { hash } from 'bcrypt';
import { isAfter } from 'date-fns';
import { inject, injectable } from 'tsyringe';

import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepositor';
import { AppError } from '@shared/errors/AppError';

interface IRequest {
  token: string;
  password: string;
}

@injectable()
class ResetPasswordUserUseCase {
  constructor(
    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute({ token, password }: IRequest): Promise<void> {
    const userToken = await this.usersTokensRepository.findByRefreshToken({
      refresh_token: token,
    });

    if (!userToken) {
      throw new AppError('Token is invalid.');
    }

    if (isAfter(new Date(), userToken.expires_date)) {
      throw new AppError('Token expired.');
    }

    const user = await this.usersRepository.findById({
      id: userToken.user_id,
    });

    user.password = await hash(password, 8);

    await this.usersRepository.update(user);
    await this.usersTokensRepository.delete(userToken);
  }
}

export { ResetPasswordUserUseCase };
