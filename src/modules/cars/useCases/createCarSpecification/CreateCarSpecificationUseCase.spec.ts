import { FakeCarsRepository } from '@modules/cars/repositories/fakes/FakeCarsRepository';
import { FakeSpecificationsRepository } from '@modules/cars/repositories/fakes/FakeSpecificationsRepository';
import { AppError } from '@shared/errors/AppError';

import { CreateCarSpecificationUseCase } from './CreateCarSpecificationUseCase';

let fakeCarsRepository: FakeCarsRepository;
let fakeSpecificationsRepository: FakeSpecificationsRepository;
let createCarSpecificationUseCase: CreateCarSpecificationUseCase;

describe('CreateCarSpecification', () => {
  beforeEach(() => {
    fakeCarsRepository = new FakeCarsRepository();
    fakeSpecificationsRepository = new FakeSpecificationsRepository();
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
      fakeCarsRepository,
      fakeSpecificationsRepository,
    );
  });

  it('should be able to add a new specification to the car', async () => {
    const { id: specification1Id } = await fakeSpecificationsRepository.create({
      name: 'SpecificationName1',
      description: 'SpecificationDescription1',
    });

    const { id: specification2Id } = await fakeSpecificationsRepository.create({
      name: 'SpecificationName2',
      description: 'SpecificationDescription2',
    });

    const { id: car_id } = await fakeCarsRepository.create({
      name: 'CarName',
      description: 'CarDescription',
      brand: 'CarBrand',
      license_plate: 'CarLicensePlate',
      daily_rate: 100,
      fine_amount: 20,
      category_id: 'CarCategoryId',
    });

    const car = await createCarSpecificationUseCase.execute({
      car_id,
      specifications_ids: [specification1Id, specification2Id],
    });

    expect(car.specifications).toHaveLength(2);
  });

  it('should not be able to add a new specification to non-existing car', async () => {
    const { id: specification1Id } = await fakeSpecificationsRepository.create({
      name: 'SpecificationName1',
      description: 'SpecificationDescription1',
    });

    const { id: specification2Id } = await fakeSpecificationsRepository.create({
      name: 'SpecificationName2',
      description: 'SpecificationDescription2',
    });

    await expect(
      createCarSpecificationUseCase.execute({
        car_id: 'non-existing-car',
        specifications_ids: [specification1Id, specification2Id],
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
