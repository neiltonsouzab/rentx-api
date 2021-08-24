import { FakeCarsRepository } from '@modules/cars/repositories/fakes/FakeCarsRepository';
import { AppError } from '@shared/errors/AppError';

import { CreateCarUseCase } from './CreateCarUseCase';

let fakeCarsRepository: FakeCarsRepository;
let createCarUseCase: CreateCarUseCase;

describe('CreateCar', () => {
  beforeEach(() => {
    fakeCarsRepository = new FakeCarsRepository();
    createCarUseCase = new CreateCarUseCase(fakeCarsRepository);
  });

  it('should be able to create a new car', async () => {
    const car = await createCarUseCase.execute({
      name: 'CarName',
      description: 'CarDescription',
      daily_rate: 100,
      license_plate: 'CarLicensePlate',
      fine_amount: 60,
      brand: 'CarBrand',
      category_id: 'CategoryId',
    });

    expect(car).toHaveProperty('id');
  });

  it('should not be able to create a car with exists license plate', async () => {
    await createCarUseCase.execute({
      name: 'CarName',
      description: 'CarDescription',
      daily_rate: 100,
      license_plate: 'CarLicensePlate',
      fine_amount: 60,
      brand: 'CarBrand',
      category_id: 'CategoryId',
    });

    await expect(
      createCarUseCase.execute({
        name: 'CarName',
        description: 'CarDescription',
        daily_rate: 100,
        license_plate: 'CarLicensePlate',
        fine_amount: 60,
        brand: 'CarBrand',
        category_id: 'CategoryId',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('must be able to create a new car as available by default', async () => {
    const car = await createCarUseCase.execute({
      name: 'CarName',
      description: 'CarDescription',
      daily_rate: 100,
      license_plate: 'CarLicensePlate',
      fine_amount: 60,
      brand: 'CarBrand',
      category_id: 'CategoryId',
    });

    expect(car.available).toBe(true);
  });
});
