import { inject, injectable } from 'tsyringe';

import { User } from '@modules/accounts/infra/typeorm/entities/User';
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository';
import { IStorageProvider } from '@shared/container/providers/StorageProvider/IStorageProvider';

interface IRequest {
  user_id: string;
  avatar_file: string;
}

@injectable()
class UpdateUserAvatarUseCase {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  async execute({ user_id, avatar_file }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById({ id: user_id });

    if (user.avatar) {
      await this.storageProvider.delete(avatar_file, 'avatars');
    }

    await this.storageProvider.save(avatar_file, 'avatars');

    user.avatar = avatar_file;

    await this.usersRepository.update(user);

    return user;
  }
}

export { UpdateUserAvatarUseCase };
