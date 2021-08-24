import { Category } from '@modules/cars/infra/typeorm/entities/Category';

type CreateCategoryData = {
  name: string;
  description: string;
};

type FindCategoryByNameData = {
  name: string;
};

interface ICategoriesRepository {
  create(data: CreateCategoryData): Promise<Category>;
  findByName(data: FindCategoryByNameData): Promise<Category>;
  list(): Promise<Category[]>;
}

export { ICategoriesRepository, CreateCategoryData, FindCategoryByNameData };
