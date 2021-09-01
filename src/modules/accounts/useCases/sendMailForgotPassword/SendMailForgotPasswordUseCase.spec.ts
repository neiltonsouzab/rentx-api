import { FakeUsersRepository } from '@modules/accounts/repositories/fakes/FakeUsersRepository';
import { FakeUsersTokensRepository } from '@modules/accounts/repositories/fakes/FakeUsersTokensRepository';
import { FakeMailProvider } from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import { AppError } from '@shared/errors/AppError';

import { SendMailForgotPasswordUseCase } from './SendMailForgotPasswordUseCase';

let fakeUsersRepository: FakeUsersRepository;
let fakeUsersTokensRepository: FakeUsersTokensRepository;
let fakeMailProvider: FakeMailProvider;

let sendMailForgotPasswordUseCase: SendMailForgotPasswordUseCase;

describe('SendMailForgotPassword', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeUsersTokensRepository = new FakeUsersTokensRepository();
    fakeMailProvider = new FakeMailProvider();

    sendMailForgotPasswordUseCase = new SendMailForgotPasswordUseCase(
      fakeUsersRepository,
      fakeUsersTokensRepository,
      fakeMailProvider,
    );
  });

  it('should be able to send a forgot password mail to user', async () => {
    await fakeUsersRepository.create({
      name: 'UserName',
      email: 'UserEmail',
      driver_license: 'UserDriverLicense',
      password: 'UserPassword',
    });

    const send = jest.spyOn(fakeMailProvider, 'send');

    await sendMailForgotPasswordUseCase.execute({
      email: 'UserEmail',
    });

    expect(send).toHaveBeenCalled();
  });

  it('should not be able to send a forgot password mail to user not exists', async () => {
    await expect(
      sendMailForgotPasswordUseCase.execute({
        email: 'non-exists',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to create an users token', async () => {
    await fakeUsersRepository.create({
      name: 'UserName',
      email: 'UserEmail',
      driver_license: 'UserDriverLicense',
      password: 'UserPassword',
    });

    const create = jest.spyOn(fakeUsersTokensRepository, 'create');

    await sendMailForgotPasswordUseCase.execute({
      email: 'UserEmail',
    });

    expect(create).toHaveBeenCalled();
  });
});
