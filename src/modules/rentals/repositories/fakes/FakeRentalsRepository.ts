import { Rental } from '@modules/rentals/infra/typeorm/entities/Rental';

import {
  CreateRentalData,
  FindByIdData,
  FindOpenRentalByCarData,
  FindOpenRentalByUserData,
  IRentalsRepository,
} from '../IRentalsRepository';

class FakeRentalsRepository implements IRentalsRepository {
  private rentals: Rental[] = [];

  async create({
    car_id,
    user_id,
    expected_return_date,
  }: CreateRentalData): Promise<Rental> {
    const rental = new Rental();

    Object.assign(rental, {
      car_id,
      user_id,
      expected_return_date,
      start_date: new Date(),
      created_at: new Date(),
    });

    this.rentals.push(rental);

    return rental;
  }

  async save(rental: Rental): Promise<Rental> {
    const index = this.rentals.findIndex(
      findRental => findRental.id === rental.id,
    );

    this.rentals[index] = rental;

    return rental;
  }

  async findById({ id }: FindByIdData): Promise<Rental> {
    return this.rentals.find(findRental => findRental.id === id);
  }

  async findOpenRentalByCar({
    car_id,
  }: FindOpenRentalByCarData): Promise<Rental> {
    return this.rentals.find(
      rental => rental.car_id === car_id && !rental.end_date,
    );
  }

  async findOpenRentalByUser({
    user_id,
  }: FindOpenRentalByUserData): Promise<Rental> {
    return this.rentals.find(
      rental => rental.user_id === user_id && !rental.end_date,
    );
  }
}

export { FakeRentalsRepository };
