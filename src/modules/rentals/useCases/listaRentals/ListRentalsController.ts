import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListRentalsUseCase } from './ListRentalsUseCase';

class ListRentalsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: user_id } = request.user;

    const listRentalsUseCase = container.resolve(ListRentalsUseCase);
    const rentals = await listRentalsUseCase.execute({ user_id });

    return response.json(rentals);
  }
}

export { ListRentalsController };
