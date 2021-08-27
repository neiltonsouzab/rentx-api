import 'reflect-metadata';
import express, { Response, Request, NextFunction } from 'express';
import 'express-async-errors';
import swagger from 'swagger-ui-express';

import '@shared/container';
import { AppError } from '@shared/errors/AppError';
import { router } from '@shared/infra/http/routes';
import createConnection from '@shared/infra/typeorm';

import swaggerFile from '../../../swagger.json';

createConnection();

const app = express();

app.use(express.json());
app.use('/docs', swagger.serve, swagger.setup(swaggerFile));
app.use(router);
app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    console.log(err);

    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        message: err.message,
      });
    }

    return response.status(500).json({
      status: 'error',
      message: `Internal server error - ${err.message}`,
    });
  },
);

export { app };