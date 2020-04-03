import { User } from '@models/user.model';
import request from 'supertest';

import app from '../../../app';
import factory from '../factories/factory';

import faker from 'faker';

describe('Session', () => {
  let user: User;

  beforeAll(async () => {
    await User.destroy({ truncate: true, restartIdentity: true });

    user = await factory.create('User');
  });

  it('should authenticate with valid credentials', async () => {
    const response = await request(app)
      .post('/login')
      .send({
        email: user.email,
        password: user.password,
      });

    expect(response.status).toBe(200);
  });

  it('should authenticate without email', async () => {
    const response = await request(app)
      .post('/login')
      .send({
        password: user.password,
      });

    expect(response.status).toBe(422);
  });

  it('should authenticate without password', async () => {
    const response = await request(app)
      .post('/login')
      .send({
        email: user.email,
      });

    expect(response.status).toBe(422);
  });

  it('should authenticate with email invalid', async () => {
    const response = await request(app)
      .post('/login')
      .send({
        email: faker.internet.email(),
        password: user.password,
      });

    expect(response.status).toBe(401);
  });

  it('should authenticate with password invalid', async () => {
    const response = await request(app)
      .post('/login')
      .send({
        email: user.email,
        password: faker.internet.password(),
      });

    expect(response.status).toBe(401);
  });

  it('should authenticate with password invalid', async () => {
    const response = await request(app)
      .post('/login')
      .send({
        email: user.email,
        password: user.password,
      });

    expect(response.body).toHaveProperty('token');
  });
});
