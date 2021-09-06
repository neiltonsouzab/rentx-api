import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UserProfileUseCase } from './UserProfileUseCase';

class UserProfileController {
  async handle(request: Request, response: Response): Promise<Response> {
    const userProfileUseCase = container.resolve(UserProfileUseCase);

    const user = await userProfileUseCase.execute(request.user.id);

    return response.json(classToClass(user));
  }
}

export { UserProfileController };
