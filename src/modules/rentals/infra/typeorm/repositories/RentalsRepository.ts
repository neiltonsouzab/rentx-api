import { getRepository, Repository, IsNull } from 'typeorm';

import {
  CreateRentalData,
  FindByIdData,
  FindByUserData,
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

  async save(rental: Rental): Promise<Rental> {
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

  async findById({ id }: FindByIdData): Promise<Rental> {
    return this.repository.findOne(id);
  }

  async findByUser({ user_id }: FindByUserData): Promise<Rental[]> {
    return this.repository.find({
      where: { user_id },
      relations: ['car'],
    });
  }
}

export { RentalsRepository };
