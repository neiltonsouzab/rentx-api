import { Car } from '@modules/cars/infra/typeorm/entities/Car';

import {
  CreateCarData,
  FindCarByAvaiableData,
  FindCarByIdData,
  FindCarByLincensePlateData,
  ICarsRepository,
} from '../ICarsRepository';

class FakeCarsRepository implements ICarsRepository {
  cars: Car[] = [];

  async create({
    name,
    description,
    brand,
    license_plate,
    daily_rate,
    fine_amount,
    category_id,
  }: CreateCarData): Promise<Car> {
    const car = new Car();

    Object.assign(car, {
      name,
      description,
      brand,
      license_plate,
      daily_rate,
      fine_amount,
      category_id,
    });

    this.cars.push(car);

    return car;
  }

  async save(car: Car): Promise<Car> {
    const index = this.cars.findIndex(findCar => findCar.id === car.id);
    this.cars[index] = car;

    return car;
  }

  async findByLicensePlate({
    license_plate,
  }: FindCarByLincensePlateData): Promise<Car> {
    return this.cars.find(findCar => findCar.license_plate === license_plate);
  }

  async findByAvailable({
    name,
    brand,
    category_id,
  }: FindCarByAvaiableData): Promise<Car[]> {
    return this.cars
      .filter(filterCar => filterCar.available)
      .filter(filterCar => (name ? filterCar.name.includes(name) : filterCar))
      .filter(filterCar =>
        brand ? filterCar.brand.includes(brand) : filterCar,
      )
      .filter(filterCar =>
        category_id ? filterCar.category_id === category_id : filterCar,
      );
  }

  async findById({ id }: FindCarByIdData): Promise<Car> {
    return this.cars.find(findCar => findCar.id === id);
  }
}

export { FakeCarsRepository };
