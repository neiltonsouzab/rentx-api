import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UploadCarImageUseCase } from './UploadCarImageUseCase';

type File = {
  filename: string;
};

class UploadCarImageController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: car_id } = request.params;
    const images = request.files as File[];

    const images_names = images.map(image => image.filename);

    const uploadCarImageUseCase = container.resolve(UploadCarImageUseCase);

    await uploadCarImageUseCase.execute({
      car_id,
      images_names,
    });

    return response.status(201).send();
  }
}

export { UploadCarImageController };
