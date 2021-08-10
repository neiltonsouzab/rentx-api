import { FakeCategoriesRepository } from '@modules/cars/repositories/fakes/FakeCategoriesRepository';
import { CreateCategoryUseCase } from '@modules/cars/useCases/createCategory/CreateCategoryUseCase';
import { AppError } from '@shared/errors/AppError';

let createCategoryUseCase: CreateCategoryUseCase;
let fakeCategoriesRepository: FakeCategoriesRepository;

describe('CreateCategoryUseCase', () => {
  beforeEach(() => {
    fakeCategoriesRepository = new FakeCategoriesRepository();
    createCategoryUseCase = new CreateCategoryUseCase(fakeCategoriesRepository);
  });

  it('should be able to create a new category', async () => {
    const category = await createCategoryUseCase.execute({
      name: 'Category Name Test',
      description: 'Category Description Test',
    });

    expect(category).toHaveProperty('id');
  });

  it('should not be able to create a new category with name exists', async () => {
    await createCategoryUseCase.execute({
      name: 'Category Name Test',
      description: 'Category Description Test',
    });

    await expect(
      createCategoryUseCase.execute({
        name: 'Category Name Test',
        description: 'Category Description Test',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
