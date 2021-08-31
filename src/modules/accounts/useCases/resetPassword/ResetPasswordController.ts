import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ResetPasswordUserUseCase } from './ResetPasswordUseCase';

class ResetPasswordController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { token, password } = request.body;

    const resetPasswordUserUseCase = container.resolve(
      ResetPasswordUserUseCase,
    );

    await resetPasswordUserUseCase.execute({
      token,
      password,
    });

    return response.send();
  }
}

export { ResetPasswordController };
