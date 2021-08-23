import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO';
import { User } from '@modules/accounts/infra/typeorm/entities/User';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';

class FakeUsersRepository implements IUsersRepository {
  users: User[] = [];

  async create({
    name,
    email,
    driver_license,
    password,
  }: ICreateUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, { name, email, driver_license, password });

    this.users.push(user);

    return user;
  }

  async update(user: User): Promise<User> {
    const indexUser = this.users.findIndex(findUser => findUser.id === user.id);

    this.users[indexUser] = user;

    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = this.users.find(findUser => findUser.email === email);

    return user;
  }

  async findById(id: string): Promise<User> {
    const user = this.users.find(findUser => findUser.id === id);

    return user;
  }
}

export { FakeUsersRepository };
