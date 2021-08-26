import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import { UsersRepository } from '@modules/accounts/infra/typeorm/repositories/UsersRepository';
import { AppError } from '@shared/errors/AppError';

interface IPayload {
  sub: string;
}

export async function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('Token missing.', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const { sub: user_id } = verify(
      token,
      '5345735b2c1cc104c57ce0e53c8fb2e8',
    ) as IPayload;

    const usersRepository = new UsersRepository();

    const user = await usersRepository.findById({ id: user_id });

    if (!user) {
      throw new AppError('User does not exists.', 401);
    }

    request.user = user;

    next();
  } catch {
    throw new AppError('Invalid token.', 401);
  }
}
