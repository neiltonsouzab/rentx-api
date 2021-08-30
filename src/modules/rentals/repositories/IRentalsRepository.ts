import { Rental } from '../infra/typeorm/entities/Rental';

type CreateRentalData = {
  car_id: string;
  user_id: string;
  expected_return_date: Date;
};

type FindOpenRentalByCarData = {
  car_id: string;
};

type FindOpenRentalByUserData = {
  user_id: string;
};

type FindByIdData = {
  id: string;
};

type FindByUserData = {
  user_id: string;
};

interface IRentalsRepository {
  create(data: CreateRentalData): Promise<Rental>;
  save(rental: Rental): Promise<Rental>;
  findOpenRentalByCar(data: FindOpenRentalByCarData): Promise<Rental>;
  findOpenRentalByUser(data: FindOpenRentalByUserData): Promise<Rental>;
  findById(data: FindByIdData): Promise<Rental>;
  findByUser(data: FindByUserData): Promise<Rental[]>;
}

export {
  IRentalsRepository,
  CreateRentalData,
  FindOpenRentalByCarData,
  FindOpenRentalByUserData,
  FindByIdData,
  FindByUserData,
};
