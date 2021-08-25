import { addHours, setSeconds, isBefore, parseISO } from 'date-fns';
import { inject, injectable } from 'tsyringe';

import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental';
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';
import { AppError } from '@shared/errors/AppError';

interface IRequest {
  user_id: string;
  car_id: string;
  expected_return_date: Date;
}

@injectable()
class CreateRentalUseCase {
  constructor(
    @inject('RentalsRepository')
    private rentalsRepository: IRentalsRepository,
  ) {}

  async execute({
    user_id,
    car_id,
    expected_return_date,
  }: IRequest): Promise<Rental> {
    const carWithOpenRental = await this.rentalsRepository.findOpenRentalByCar({
      car_id,
    });

    if (carWithOpenRental) {
      throw new AppError('Car has open rent.');
    }

    const userWithOpenRental =
      await this.rentalsRepository.findOpenRentalByUser({
        user_id,
      });

    if (userWithOpenRental) {
      throw new AppError('User has open rent.');
    }

    const minimumReturnDate = setSeconds(addHours(new Date(), 24), 0);

    if (isBefore(parseISO(String(expected_return_date)), minimumReturnDate)) {
      throw new AppError('Invalid return time.');
    }

    console.log(expected_return_date);

    const rental = await this.rentalsRepository.create({
      car_id,
      user_id,
      expected_return_date,
    });

    return rental;
  }
}

export { CreateRentalUseCase };
