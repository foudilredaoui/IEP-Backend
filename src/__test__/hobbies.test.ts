import request from 'supertest';
import { get } from 'lodash';
import mongoose from 'mongoose';
import log from '@src/logger';
import app from '@src/app';
import config from '@src/__test__/fixtures/config';
import * as user from '@src/__test__/fixtures/db/user';
import User from '@src/model/user.model';

const BASE_URL = '/api/v1';

beforeAll(async () => {
  const url = config.BD_TEST_URL;
  mongoose
    .connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      log.info('Database connected');
    })
    .catch(error => {
      log.error('db error', error);
      process.exit(1);
    });
});

beforeEach(user.setupDatabase);
const id = get(user.userOne, '_id');

describe('create hobbies successfuly', () => {
  test('Should get create user and get 201 status', async () => {
    const testUser = await User.findOne({ name: 'Foudil' });
    const testId = get(testUser, '_id');
    const response = await request(app)
      .post(`${BASE_URL}/hobbies/${testId}`)
      .send({
        passionLevel: 'High',
        name: 'handball',
        year: 2010,
      })
      .expect(201);
    expect(response.body.message).toEqual('Hobbies was created succesfully');
    expect(response.body).not.toBeNull();
  });
  test('response has id', async () => {
    const response = await request(app).post(`${BASE_URL}/hobbies/${id}`).send({
      passionLevel: 'Medium',
      name: 'Music',
      year: 2005,
    });
    expect(response.body.data.id).toBeDefined();
  });
});

describe('create hobbies validation', () => {
  test('should respond with passion level enum', async () => {
    const response = await request(app)
      .post(`${BASE_URL}/hobbies/${id}`)
      .send({
        passionLevel: 'little',
        name: 'Books',
        year: 2005,
      })
      .expect(400);
    expect(response.body[0]).toEqual(
      'body.passionLevel must be one of the following values: Low, Medium, High, Very-High'
    );
  });
});
