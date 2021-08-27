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
    const rental = await createRentalUseCase.execute({
      car_id: 'CarId',
      user_id: 'UserId',
      expected_return_date: addHours(new Date(), 24),
    });

    expect(rental).toHaveProperty('id');
  });

  it('should not be able to create a new rental if there is another open to the same car', async () => {
    await createRentalUseCase.execute({
      car_id: 'CarId1',
      user_id: 'UserId1',
      expected_return_date: addHours(new Date(), 24),
    });

    await expect(
      createRentalUseCase.execute({
        car_id: 'CarId1',
        user_id: 'UserId2',
        expected_return_date: addHours(new Date(), 24),
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to create a new rental if there is another open to the same user', async () => {
    await createRentalUseCase.execute({
      car_id: 'CarId1',
      user_id: 'UserId1',
      expected_return_date: addHours(new Date(), 24),
    });

    await expect(
      createRentalUseCase.execute({
        car_id: 'CarId2',
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
