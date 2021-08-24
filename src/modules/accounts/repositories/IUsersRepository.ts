import { User } from '../infra/typeorm/entities/User';

type CreateUserData = {
  name: string;
  email: string;
  password: string;
  driver_license: string;
};

type FindUserByEmailData = {
  email: string;
};

type FindUserByIdData = {
  id: string;
};

interface IUsersRepository {
  create(data: CreateUserData): Promise<User>;
  update(user: User): Promise<User>;
  findByEmail(data: FindUserByEmailData): Promise<User>;
  findById(data: FindUserByIdData): Promise<User>;
}

export {
  IUsersRepository,
  CreateUserData,
  FindUserByIdData,
  FindUserByEmailData,
};
