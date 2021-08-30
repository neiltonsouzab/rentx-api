import { Router } from 'express';

import { CreateRentalController } from '@modules/rentals/useCases/createRental/CreateRentalController';
import { DevolutionRentalController } from '@modules/rentals/useCases/devolutionRenteal/DevolutionRentalController';
import { ListRentalsController } from '@modules/rentals/useCases/listaRentals/ListRentalsController';

import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';

const rentalsRoutes = Router();
const createRentalController = new CreateRentalController();
const devolutionRentalController = new DevolutionRentalController();
const listRentalsController = new ListRentalsController();

rentalsRoutes.get('/', ensureAuthenticated, listRentalsController.handle);
rentalsRoutes.post('/', ensureAuthenticated, createRentalController.handle);
rentalsRoutes.post(
  '/devolutions',
  ensureAuthenticated,
  devolutionRentalController.handle,
);

export { rentalsRoutes };
