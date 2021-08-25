import { getRepository, Repository, IsNull } from 'typeorm';

import {
  CreateRentalData,
  FindOpenRentalByCarData,
  FindOpenRentalByUserData,
  IRentalsRepository,
} from '@modules/rentals/repositories/IRentalsRepository';

import { Rental } from '../entities/Rental';

class RentalsRepository implements IRentalsRepository {
  private repository: Repository<Rental>;

  constructor() {
    this.repository = getRepository(Rental);
  }
  create({
    car_id,
    user_id,
    expected_return_date,
  }: CreateRentalData): Promise<Rental> {
    const rental = this.repository.create({
      car_id,
      user_id,
      expected_return_date,
    });

    return this.repository.save(rental);
  }
  findOpenRentalByCar({ car_id }: FindOpenRentalByCarData): Promise<Rental> {
    return this.repository.findOne({
      car_id,
      end_date: IsNull(),
    });
  }
  findOpenRentalByUser({ user_id }: FindOpenRentalByUserData): Promise<Rental> {
    return this.repository.findOne({
      user_id,
      end_date: IsNull(),
    });
  }
}

export { RentalsRepository };
