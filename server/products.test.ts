import request from 'supertest';
import db from '../db/index.js';
import Product from '../db/models/product.js';
import type { ProductInstance } from '../db/models/product.js';
import User from '../db/models/user.js';
import app from './start.js';

const testAdminUser = {
  name: 'Product Admin',
  username: 'productadmin@example.com',
  password: 'adminpass',
};

describe('/api/products', () => {
  const agent = request.agent(app);
  let product: ProductInstance;

  beforeAll(async () => {
    await db.didSync;
    await User.create({
      name: testAdminUser.name,
      email: testAdminUser.username,
      password: testAdminUser.password,
      isAdmin: true,
    });
    await agent.post('/api/auth/local/login').send(testAdminUser);
    product = await Product.create({
      name: 'Test Cookie',
      description: 'A delicious test cookie',
      price: 2.99,
      quantity: 100,
      categories: ['test'],
    });
  });

  describe('GET /', () => {
    it('returns all products (public, no auth required)', async () => {
      const res = await request(app).get('/api/products').expect(200);
      expect(Array.isArray(res.body)).toBe(true);
      expect(res.body.length).toBeGreaterThan(0);
    });
  });

  describe('GET /:id', () => {
    it('returns a single product by id', async () => {
      const res = await request(app)
        .get('/api/products/' + product.id)
        .expect(200);
      expect(res.body).toHaveProperty('id', product.id);
      expect(res.body).toHaveProperty('name', 'Test Cookie');
    });

    it('returns 404 for a non-existent product', () =>
      request(app).get('/api/products/999999').expect(404));
  });

  describe('POST / (admin)', () => {
    let createdId: number;

    it('creates a new product when logged in as admin', async () => {
      const res = await agent
        .post('/api/products')
        .send({
          name: 'New Cookie',
          description: 'A freshly baked cookie',
          price: 3.49,
          quantity: 50,
          categories: ['new'],
        })
        .expect(200);
      createdId = res.body.id;
      expect(res.body).toHaveProperty('name', 'New Cookie');
      expect(res.body).toHaveProperty('description', 'A freshly baked cookie');
    });

    describe('PUT /:id (admin)', () => {
      it('updates an existing product when logged in as admin', async ctx => {
        if (!createdId) return ctx.skip();
        const res = await agent
          .put('/api/products/' + createdId)
          .send({ name: 'Updated Cookie', price: 4.99 })
          .expect(200);
        expect(res.body).toHaveProperty('name', 'Updated Cookie');
      });
    });

    describe('DELETE /:id (admin)', () => {
      it('deletes a product when logged in as admin', ctx => {
        if (!createdId) return ctx.skip();
        return agent.delete('/api/products/' + createdId).expect(200);
      });
    });
  });
});
