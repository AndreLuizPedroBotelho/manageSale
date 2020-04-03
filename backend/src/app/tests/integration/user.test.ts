import { User } from '@models/user.model';
import request from 'supertest';

import app from '../../../app';
import { user } from '../faker/user.faker';
import faker from 'faker';
import factory from '../factories/factory';
let newUser: User;
let userAuth: User;

describe('Users', () => {
  beforeAll(async () => {
    await User.destroy({ truncate: true, restartIdentity: true });
    userAuth = await factory.create('User');
  });

  it('should create User', async () => {
    user.email = faker.internet.email();

    const response = await request(app)
      .post('/users')
      .send(user);
    newUser = response.body.data;
    expect(response.status).toBe(200);
  });

  it("should don't create User ", async () => {
    const response = await request(app)
      .post('/users')
      .send(user);
    expect(response.status).toBe(422);
  });

  it('should list one user', async () => {
    const response = await request(app)
      .get(`/users/${newUser.id}`)
      .set('authorization', `${userAuth.generateToken()}`)
      .send();
    expect(response.status).toBe(200);
  });

  it("should don't list one user", async () => {
    const response = await request(app)
      .get(`/users/9999`)
      .set('authorization', `${userAuth.generateToken()}`)
      .send();
    expect(response.status).toBe(404);
  });

  it('should update User', async () => {
    user.email = faker.internet.email();

    const response = await request(app)
      .put(`/users/${newUser.id}`)
      .set('authorization', `${userAuth.generateToken()}`)
      .send(user);

    expect(response.status).toBe(200);
  });

  it("should don't update User ", async () => {
    user.email = faker.internet.email();
    const response = await request(app)
      .put('/users/99999')
      .set('authorization', `${userAuth.generateToken()}`)
      .send(user);
    expect(response.status).toBe(404);
  });

  it("should don't list Users", async () => {
    const response = await request(app)
      .get('/users')
      .set(
        'authorization',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
      )
      .send();
    expect(response.status).toBe(401);
  });

  it('should list Users', async () => {
    const response = await request(app)
      .get('/users')
      .set('authorization', `${userAuth.generateToken()}`)
      .send();
    expect(response.status).toBe(200);
  });

  it('should delete User', async () => {
    const response = await request(app)
      .delete(`/users/${newUser.id}`)
      .set('authorization', `${userAuth.generateToken()}`)
      .send();

    expect(response.status).toBe(200);
  });

  it("should don't delete User ", async () => {
    const response = await request(app)
      .delete('/users/99999')
      .set('authorization', `${userAuth.generateToken()}`)
      .send();
    expect(response.status).toBe(404);
  });
});
