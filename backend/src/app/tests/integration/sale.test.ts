import { User } from '@models/user.model';
import request from 'supertest';

import app from '../../../app';
import { sale } from '../faker/sale.faker';
import factory from '../factories/factory';

let newSale: User;
let userAuth: User;

describe('Sales', () => {
  beforeAll(async () => {
    await User.destroy({ truncate: true, restartIdentity: true });
    userAuth = await factory.create('User');
  });

  it('should create Sale', async () => {
    const response = await request(app)
      .post('/sales')
      .set('authorization', `${userAuth.generateToken()}`)
      .send(sale);
    newSale = response.body.data;
    expect(response.status).toBe(200);
  });

  it("should don't create User ", async () => {
    delete sale.dataVenda;
    const response = await request(app)
      .post('/sales')
      .set('authorization', `${userAuth.generateToken()}`)
      .send(sale);
    expect(response.status).toBe(422);
  });

  it('should list one user', async () => {
    const response = await request(app)
      .get(`/sales/${newSale.id}`)
      .set('authorization', `${userAuth.generateToken()}`)
      .send();
    expect(response.status).toBe(200);
  });

  it("should don't list one user", async () => {
    const response = await request(app)
      .get(`/sales/9999`)
      .set('authorization', `${userAuth.generateToken()}`)
      .send();
    expect(response.status).toBe(404);
  });

  it('should update User', async () => {
    const response = await request(app)
      .put(`/sales/${newSale.id}`)
      .set('authorization', `${userAuth.generateToken()}`)
      .send(newSale);

    expect(response.status).toBe(200);
  });

  it("should don't update User ", async () => {
    const response = await request(app)
      .put('/sales/99999')
      .set('authorization', `${userAuth.generateToken()}`)
      .send(newSale);
    expect(response.status).toBe(404);
  });

  it("should don't list Sales", async () => {
    const response = await request(app)
      .get('/sales')
      .set(
        'authorization',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6Ikp3XVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
      )
      .send();
    expect(response.status).toBe(401);
  });

  it('should list Sales', async () => {
    const response = await request(app)
      .get('/sales')
      .set('authorization', `${userAuth.generateToken()}`)
      .send();
    expect(response.status).toBe(200);
  });

  it('should delete User', async () => {
    const response = await request(app)
      .delete(`/sales/${newSale.id}`)
      .set('authorization', `${userAuth.generateToken()}`)
      .send();

    expect(response.status).toBe(200);
  });

  it("should don't delete User ", async () => {
    const response = await request(app)
      .delete('/sales/99999')
      .set('authorization', `${userAuth.generateToken()}`)
      .send();
    expect(response.status).toBe(404);
  });
});
