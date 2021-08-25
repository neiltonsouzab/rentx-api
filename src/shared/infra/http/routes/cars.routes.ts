import { Router } from 'express';
import multer from 'multer';

import uploadConfig from '@config/upload';
import { CreateCarController } from '@modules/cars/useCases/createCar/CreateCarController';
import { CreateCarSpecificationController } from '@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController';
import { ListAvailableCarsController } from '@modules/cars/useCases/listAvailableCars/ListAvailableCarsController';
import { UploadCarImageController } from '@modules/cars/useCases/uploadCarImage/UploadCarImageController';

import { ensureAdmin } from '../middlewares/ensureAdmin';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const upload = multer(uploadConfig.upload('./tmp/cars'));

const carsRoutes = Router();

const createCarController = new CreateCarController();
const createCarSpecificationController = new CreateCarSpecificationController();
const listCarsAvailableController = new ListAvailableCarsController();
const uploadCarsImages = new UploadCarImageController();

carsRoutes.post(
  '/',
  ensureAuthenticated,
  ensureAdmin,
  createCarController.handle,
);

carsRoutes.get('/available', listCarsAvailableController.handle);

carsRoutes.post('/:id/specifications', createCarSpecificationController.handle);

carsRoutes.post(
  '/:id/images',
  ensureAuthenticated,
  ensureAdmin,
  upload.array('images'),
  uploadCarsImages.handle,
);

export { carsRoutes };
