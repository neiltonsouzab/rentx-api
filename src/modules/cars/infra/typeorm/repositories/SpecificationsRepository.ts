import { getRepository, Repository } from 'typeorm';

import { Specification } from '@modules/cars/infra/typeorm/entities/Specification';
import {
  CreateSpecificationData,
  FindSpecificationByNameData,
  FindSpecificationsByIdData,
  ISpecificationsRepository,
} from '@modules/cars/repositories/ISpecificationsRepository';

class SpecificationsRepository implements ISpecificationsRepository {
  private repository: Repository<Specification>;

  constructor() {
    this.repository = getRepository(Specification);
  }

  async create({
    name,
    description,
  }: CreateSpecificationData): Promise<Specification> {
    const specification = this.repository.create({
      name,
      description,
    });

    await this.repository.save(specification);

    return specification;
  }

  async findByName({
    name,
  }: FindSpecificationByNameData): Promise<Specification> {
    const specification = await this.repository.findOne({
      where: {
        name,
      },
    });

    return specification;
  }

  async findByIds({
    ids,
  }: FindSpecificationsByIdData): Promise<Specification[]> {
    return this.repository.findByIds(ids);
  }
}

export { SpecificationsRepository };
