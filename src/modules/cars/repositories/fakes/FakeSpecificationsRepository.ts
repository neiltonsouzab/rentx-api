import { Specification } from '@modules/cars/infra/typeorm/entities/Specification';

import {
  CreateSpecificationData,
  FindSpecificationByNameData,
  FindSpecificationsByIdData,
  ISpecificationsRepository,
} from '../ISpecificationsRepository';

class FakeSpecificationsRepository implements ISpecificationsRepository {
  specifications: Specification[] = [];

  async create({
    name,
    description,
  }: CreateSpecificationData): Promise<Specification> {
    const specification = new Specification();

    Object.assign(specification, {
      name,
      description,
    });

    this.specifications.push(specification);

    return specification;
  }

  async findByName({
    name,
  }: FindSpecificationByNameData): Promise<Specification> {
    return this.specifications.find(
      findSpecification => findSpecification.name === name,
    );
  }

  async findByIds({
    ids,
  }: FindSpecificationsByIdData): Promise<Specification[]> {
    return this.specifications.filter(findSpecification =>
      ids.includes(findSpecification.id),
    );
  }
}

export { FakeSpecificationsRepository };
