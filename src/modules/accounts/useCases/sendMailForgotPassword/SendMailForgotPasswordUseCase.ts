import { addHours } from 'date-fns';
import path from 'path';
import { inject, injectable } from 'tsyringe';
import { v4 as uuidV4 } from 'uuid';

import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { IUsersTokensRepository } from '@modules/accounts/repositories/IUsersTokensRepositor';
import { IMailProvider } from '@shared/container/providers/MailProvider/IMailProvider';
import { AppError } from '@shared/errors/AppError';

interface IRequest {
  email: string;
}

@injectable()
class SendMailForgotPasswordUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository,
    @inject('MailProvider')
    private mailProvider: IMailProvider,
  ) {}

  async execute({ email }: IRequest): Promise<void> {
    const user = await this.usersRepository.findByEmail({
      email,
    });

    if (!user) {
      throw new AppError('User does not exists.');
    }

    const token = uuidV4();

    await this.usersTokensRepository.create({
      refresh_token: token,
      user_id: user.id,
      expires_date: addHours(new Date(), 3),
    });

    const templatePath = path.resolve(
      __dirname,
      '..',
      '..',
      'views',
      'emails',
      'forgot-password.hbs',
    );

    const variables = {
      name: user.name,
      link: `${process.env.APP_URL}/password/reset?token=${token}`,
    };

    await this.mailProvider.send({
      to: email,
      subject: 'Recuperação de senha',
      templatePath,
      variables,
    });
  }
}

export { SendMailForgotPasswordUseCase };
