import { hash } from 'bcrypt';
import { inject, injectable } from 'tsyringe';

import { User } from '@modules/accounts/infra/typeorm/entities/User';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { AppError } from '@shared/errors/AppError';

interface IRequest {
  name: string;
  email: string;
  driver_license: string;
  password: string;
}

@injectable()
class CreateUserUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  async execute({
    name,
    email,
    driver_license,
    password,
  }: IRequest): Promise<User> {
    const userAlreadyExists = await this.usersRepository.findByEmail({ email });

    if (userAlreadyExists) {
      throw new AppError('User already exists.');
    }

    const passwordHashed = await hash(password, 8);

    const user = await this.usersRepository.create({
      name,
      email,
      driver_license,
      password: passwordHashed,
    });

    return user;
  }
}

export { CreateUserUseCase };
