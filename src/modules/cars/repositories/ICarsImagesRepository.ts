import { CarImage } from '../infra/typeorm/entities/CarImage';

type CreateCarData = {
  car_id: string;
  image_name: string;
};

interface ICarsImagesRepository {
  create(data: CreateCarData): Promise<CarImage>;
}

export { ICarsImagesRepository, CreateCarData };
