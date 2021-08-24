import { getRepository, Repository } from 'typeorm';

import { User } from '@modules/accounts/infra/typeorm/entities/User';
import {
  CreateUserData,
  FindUserByEmailData,
  FindUserByIdData,
  IUsersRepository,
} from '@modules/accounts/repositories/IUsersRepository';

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async create({
    name,
    email,
    driver_license,
    password,
  }: CreateUserData): Promise<User> {
    const user = this.repository.create({
      name,
      email,
      driver_license,
      password,
    });

    await this.repository.save(user);

    return user;
  }

  async update(user: User): Promise<User> {
    return this.repository.save(user);
  }

  async findByEmail({ email }: FindUserByEmailData): Promise<User> {
    const user = await this.repository.findOne({ email });

    return user;
  }

  async findById({ id }: FindUserByIdData): Promise<User> {
    const user = await this.repository.findOne(id);

    return user;
  }
}

export { UsersRepository };
