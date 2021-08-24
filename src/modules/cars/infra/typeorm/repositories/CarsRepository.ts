import { getRepository, Repository } from 'typeorm';

import {
  CreateCarData,
  FindCarByAvaiableData,
  FindCarByIdData,
  FindCarByLincensePlateData,
  ICarsRepository,
} from '@modules/cars/repositories/ICarsRepository';

import { Car } from '../entities/Car';

class CarsRepository implements ICarsRepository {
  private repository: Repository<Car>;

  constructor() {
    this.repository = getRepository(Car);
  }

  async create({
    name,
    description,
    brand,
    license_plate,
    daily_rate,
    fine_amount,
    category_id,
  }: CreateCarData): Promise<Car> {
    const car = this.repository.create({
      name,
      description,
      brand,
      license_plate,
      daily_rate,
      fine_amount,
      category_id,
    });

    await this.repository.save(car);

    return car;
  }

  save(car: Car): Promise<Car> {
    return this.repository.save(car);
  }

  async findByLicensePlate({
    license_plate,
  }: FindCarByLincensePlateData): Promise<Car> {
    return this.repository.findOne({ license_plate });
  }

  async findByAvailable({
    name,
    brand,
    category_id,
  }: FindCarByAvaiableData): Promise<Car[]> {
    const query = this.repository.createQueryBuilder('c');

    query.where('c.available = :available', { available: true });

    if (name) {
      query.andWhere('c.name = :name', { name });
    }

    if (brand) {
      query.andWhere('c.brand = :brand', { brand });
    }

    if (category_id) {
      query.andWhere('c.category_id = :category_id', { category_id });
    }

    return query.getMany();
  }

  findById({ id }: FindCarByIdData): Promise<Car> {
    return this.repository.findOne(id);
  }
}

export { CarsRepository };
