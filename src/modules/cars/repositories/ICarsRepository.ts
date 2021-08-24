import { Car } from '../infra/typeorm/entities/Car';

type CreateCarData = {
  name: string;
  description: string;
  daily_rate: number;
  license_plate: string;
  fine_amount: number;
  brand: string;
  category_id: string;
};

type FindCarByLincensePlateData = {
  license_plate: string;
};

type FindCarByAvaiableData = {
  name?: string;
  brand?: string;
  category_id?: string;
};

type FindCarByIdData = {
  id: string;
};

interface ICarsRepository {
  create(data: CreateCarData): Promise<Car>;
  save(car: Car): Promise<Car>;
  findByLicensePlate(
    data: FindCarByLincensePlateData,
  ): Promise<Car | undefined>;
  findByAvailable(data?: FindCarByAvaiableData): Promise<Car[]>;
  findById(data: FindCarByIdData): Promise<Car>;
}

export {
  ICarsRepository,
  CreateCarData,
  FindCarByLincensePlateData,
  FindCarByAvaiableData,
  FindCarByIdData,
};
