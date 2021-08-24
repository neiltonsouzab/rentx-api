import { FakeCarsRepository } from '@modules/cars/repositories/fakes/FakeCarsRepository';

import { ListAvailableCarsUseCase } from './ListAvailableCarsUseCase';

let listAvailableCars: ListAvailableCarsUseCase;
let fakeCarsRepository: FakeCarsRepository;

describe('ListAvailableCars', () => {
  beforeEach(() => {
    fakeCarsRepository = new FakeCarsRepository();
    listAvailableCars = new ListAvailableCarsUseCase(fakeCarsRepository);
  });

  it('should be able to list all available cars', async () => {
    const car = await fakeCarsRepository.create({
      name: 'CarName',
      description: 'CarDescription',
      brand: 'CarBrand',
      license_plate: 'CarLicensePlate',
      daily_rate: 100,
      fine_amount: 20,
      category_id: 'CarCategoryId',
    });

    const cars = await listAvailableCars.execute();

    expect(cars).toContain(car);
  });

  it('should be able to list all avialable cars by name', async () => {
    const car1 = await fakeCarsRepository.create({
      name: 'CarName1',
      description: 'CarDescription1',
      brand: 'CarBrand1',
      license_plate: 'CarLicensePlate1',
      daily_rate: 100,
      fine_amount: 20,
      category_id: 'CarCategoryId1',
    });

    await fakeCarsRepository.create({
      name: 'CarName2',
      description: 'CarDescription2',
      brand: 'CarBrand2',
      license_plate: 'CarLicensePlate2',
      daily_rate: 100,
      fine_amount: 20,
      category_id: 'CarCategoryId2',
    });

    const cars = await listAvailableCars.execute({
      name: 'CarName1',
    });

    expect(cars).toEqual([car1]);
  });

  it('should be able to list all avialable cars by brand', async () => {
    const car1 = await fakeCarsRepository.create({
      name: 'CarName1',
      description: 'CarDescription1',
      brand: 'CarBrand1',
      license_plate: 'CarLicensePlate1',
      daily_rate: 100,
      fine_amount: 20,
      category_id: 'CarCategoryId1',
    });

    await fakeCarsRepository.create({
      name: 'CarName2',
      description: 'CarDescription2',
      brand: 'CarBrand2',
      license_plate: 'CarLicensePlate2',
      daily_rate: 100,
      fine_amount: 20,
      category_id: 'CarCategoryId2',
    });

    const cars = await listAvailableCars.execute({
      brand: 'CarBrand1',
    });

    expect(cars).toEqual([car1]);
  });

  it('should be able to list all avialable cars by category', async () => {
    const car1 = await fakeCarsRepository.create({
      name: 'CarName1',
      description: 'CarDescription1',
      brand: 'CarBrand1',
      license_plate: 'CarLicensePlate1',
      daily_rate: 100,
      fine_amount: 20,
      category_id: 'CarCategoryId1',
    });

    await fakeCarsRepository.create({
      name: 'CarName2',
      description: 'CarDescription2',
      brand: 'CarBrand2',
      license_plate: 'CarLicensePlate2',
      daily_rate: 100,
      fine_amount: 20,
      category_id: 'CarCategoryId2',
    });

    const cars = await listAvailableCars.execute({
      category_id: 'CarCategoryId1',
    });

    expect(cars).toEqual([car1]);
  });
});
