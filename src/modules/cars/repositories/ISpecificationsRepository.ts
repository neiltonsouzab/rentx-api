import { Specification } from '@modules/cars/infra/typeorm/entities/Specification';

type CreateSpecificationData = {
  name: string;
  description: string;
};

type FindSpecificationByNameData = {
  name: string;
};

type FindSpecificationsByIdData = {
  ids: string[];
};

interface ISpecificationsRepository {
  create(data: CreateSpecificationData): Promise<Specification>;
  findByName(data: FindSpecificationByNameData): Promise<Specification>;
  findByIds(data: FindSpecificationsByIdData): Promise<Specification[]>;
}

export {
  ISpecificationsRepository,
  CreateSpecificationData,
  FindSpecificationByNameData,
  FindSpecificationsByIdData,
};
