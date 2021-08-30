import { addHours } from 'date-fns';

import { FakeCarsRepository } from '@modules/cars/repositories/fakes/FakeCarsRepository';
import { FakeRentalsRepository } from '@modules/rentals/repositories/fakes/FakeRentalsRepository';
import { AppError } from '@shared/errors/AppError';

import { CreateRentalUseCase } from './CreateRentalUseCase';

let fakeCarsRepository: FakeCarsRepository;
let fakeRentalsRepository: FakeRentalsRepository;
let createRentalUseCase: CreateRentalUseCase;

describe('CreateRental', () => {
  beforeEach(() => {
    fakeCarsRepository = new FakeCarsRepository();
    fakeRentalsRepository = new FakeRentalsRepository();
    createRentalUseCase = new CreateRentalUseCase(
      fakeCarsRepository,
      fakeRentalsRepository,
    );
  });

  it('should be able to create a new rental the car', async () => {
    const car = await fakeCarsRepository.create({
      name: 'CarName',
      description: 'CarDescription',
      brand: 'CarBrand',
      license_plate: '1234-5678',
      daily_rate: 100,
      fine_amount: 30,
      category_id: 'category-id',
    });

    const rental = await createRentalUseCase.execute({
      car_id: car.id,
      user_id: 'UserId',
      expected_return_date: addHours(new Date(), 24),
    });

    expect(rental).toHaveProperty('id');
  });

  it('should not be able to create a new rental if there is another open to the same car', async () => {
    const car = await fakeCarsRepository.create({
      name: 'CarName',
      description: 'CarDescription',
      brand: 'CarBrand',
      license_plate: '1234-5678',
      daily_rate: 100,
      fine_amount: 30,
      category_id: 'category-id',
    });

    await createRentalUseCase.execute({
      car_id: car.id,
      user_id: 'UserId1',
      expected_return_date: addHours(new Date(), 24),
    });

    await expect(
      createRentalUseCase.execute({
        car_id: car.id,
        user_id: 'UserId2',
        expected_return_date: addHours(new Date(), 24),
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new rental if there is another open to the same user', async () => {
    const car1 = await fakeCarsRepository.create({
      name: 'CarName1',
      description: 'CarDescription1',
      brand: 'CarBrand1',
      license_plate: '1234-5678',
      daily_rate: 100,
      fine_amount: 30,
      category_id: 'category-id',
    });

    const car2 = await fakeCarsRepository.create({
      name: 'CarName2',
      description: 'CarDescription2',
      brand: 'CarBrand2',
      license_plate: '2234-5678',
      daily_rate: 100,
      fine_amount: 30,
      category_id: 'category-id',
    });

    await createRentalUseCase.execute({
      car_id: car1.id,
      user_id: 'UserId1',
      expected_return_date: addHours(new Date(), 24),
    });

    await expect(
      createRentalUseCase.execute({
        car_id: car2.id,
        user_id: 'UserId1',
        expected_return_date: addHours(new Date(), 24),
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new rental with invalid return time', async () => {
    await expect(
      createRentalUseCase.execute({
        car_id: 'CarId2',
        user_id: 'UserId1',
        expected_return_date: addHours(new Date(), 10),
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
