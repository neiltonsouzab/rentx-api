import { differenceInDays, setHours, differenceInHours } from 'date-fns';
import { inject, injectable } from 'tsyringe';

import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental';
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';
import { AppError } from '@shared/errors/AppError';

interface IRequest {
  rental_id: string;
  user_id: string;
}

@injectable()
class DevolutionRentalUseCase {
  constructor(
    @inject('RentalsRepository')
    private rentalsRepository: IRentalsRepository,
    @inject('CarsRepository')
    private carsRepository: ICarsRepository,
  ) {}

  async execute({ rental_id, user_id }: IRequest): Promise<Rental> {
    const rental = await this.rentalsRepository.findById({ id: rental_id });

    if (!rental) {
      throw new AppError('Rental does not exists.');
    }

    const car = await this.carsRepository.findById({ id: rental.car_id });

    const minimumDailyAmount = 1;
    const end_date = new Date();
    const dailyAmount = Math.ceil(
      differenceInHours(end_date, rental.created_at) / 24,
    );
    const delayAmount = Math.ceil(
      differenceInHours(new Date(), rental.expected_return_date) / 24,
    );

    const total = car.daily_rate * dailyAmount + car.fine_amount * delayAmount;

    rental.end_date = end_date;
    rental.total = total;
    car.available = true;

    await this.rentalsRepository.save(rental);
    await this.carsRepository.save(car);

    return rental;
  }
}

export { DevolutionRentalUseCase };
