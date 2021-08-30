import { hash } from 'bcrypt';
import request from 'supertest';
import { Connection } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

import { app } from '@shared/infra/http/app';
import createConnection from '@shared/infra/typeorm/index';

let connection: Connection;

describe('ListCategoriesController', () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    const id = uuidV4();
    const password = await hash('admin', 8);

    await connection.query(
      `INSERT INTO users (id, name, email, password, is_admin, driver_license, created_at)
          VALUES ('${id}', 'admin', 'admin@rentx.com.br', '${password}', true, 'XX12345', 'now()')
        `,
    );
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it('should be able to create list categories', async () => {
    const responseToken = await request(app).post('/sessions').send({
      email: 'admin@rentx.com.br',
      password: 'admin',
    });

    const { token } = responseToken.body;

    await request(app)
      .post('/categories')
      .set({
        Authorization: `Bearer ${token}`,
      })
      .send({
        name: 'CategoryName1',
        description: 'CategoryDescription1',
      });

    await request(app)
      .post('/categories')
      .set({
        Authorization: `Bearer ${token}`,
      })
      .send({
        name: 'CategoryName2',
        description: 'CategoryDescription2',
      });

    const response = await request(app).get('/categories');

    expect(response.status).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });
});
