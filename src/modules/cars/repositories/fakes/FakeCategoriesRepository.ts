import { Category } from '@modules/cars/infra/typeorm/entities/Category';
import {
  CreateCategoryData,
  FindCategoryByNameData,
  ICategoriesRepository,
} from '@modules/cars/repositories/ICategoriesRepository';

class FakeCategoriesRepository implements ICategoriesRepository {
  categories: Category[] = [];

  async create({ name, description }: CreateCategoryData): Promise<Category> {
    const category = new Category();

    Object.assign(category, {
      name,
      description,
    });

    this.categories.push(category);

    return category;
  }

  async findByName({ name }: FindCategoryByNameData): Promise<Category> {
    const category = this.categories.find(category => category.name === name);

    return category;
  }

  async list(): Promise<Category[]> {
    return this.categories;
  }
}

export { FakeCategoriesRepository };
