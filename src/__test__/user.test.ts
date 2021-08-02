import request from 'supertest';
import mongoose from 'mongoose';

import app from '@src/app';
import config from '@src/__test__/fixtures/config';
import * as user from '@src/__test__/fixtures/db/user';

const BASE_URL = '/api/v1';

// connect to test database
// beforeAll(async () => {
//   const url = config.BD_TEST_URL;
//   await mongoose.connect(url, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   });
// });

beforeEach(user.setupDatabase);

describe('create user successfuly', () => {
  test('Should get create user and get 201 status', async () => {
    const response = await request(app).post(`${BASE_URL}/user`).send({ name: 'foudil' }).expect(201);
    expect(response.body.message).toEqual('User was created succesfully');
    expect(response.body).not.toBeNull();
  });
  test('response has id', async () => {
    const response = await request(app).post(`${BASE_URL}/user`).send({ name: 'djel' });
    expect(response.body.data.id).toBeDefined();
  });
});

describe('create user validation', () => {
  test('should respond with name is missing', async () => {
    const response = await request(app).post(`${BASE_URL}/user`).send({}).expect(400);
    expect(response.body[0]).toEqual('Name is required');
  });
});
