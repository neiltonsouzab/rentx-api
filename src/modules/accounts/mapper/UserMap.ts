import { classToClass } from 'class-transformer';

import { User } from '../infra/typeorm/entities/User';

type UserMapResponse = {
  id: string;
  name: string;
  email: string;
  driver_license: string;
  avatar: string;
};

class UserMap {
  static toDTO({
    id,
    name,
    email,
    driver_license,
    avatar,
  }: User): UserMapResponse {
    const user = classToClass({
      id,
      name,
      email,
      driver_license,
      avatar,
    });

    return {
      id,
      name,
      email,
      driver_license,
      avatar,
    };
  }
}

export { UserMap, UserMapResponse };
