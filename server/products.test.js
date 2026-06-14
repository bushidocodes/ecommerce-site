import request from 'supertest';
import { expect } from 'chai';
import db from '../db/index.js';
import Product from '../db/models/product.js';
import User from '../db/models/user.js';
import app from './start.js';

const testAdminUser = {
  name: 'Product Admin',
  username: 'productadmin@example.com',
  password: 'adminpass',
};

describe('/api/products', () => {
  const agent = request.agent(app);
  let product, adminUser;

  before('sync db, create admin user and log in', () =>
    db.didSync
      .then(() =>
        User.create({
          name: testAdminUser.name,
          email: testAdminUser.username,
          password: testAdminUser.password,
          isAdmin: true,
        })
      )
      .then(_user => {
        adminUser = _user;
        return agent.post('/api/auth/local/login').send(testAdminUser);
      })
  );

  before('create a test product', () =>
    Product.create({
      name: 'Test Cookie',
      description: 'A delicious test cookie',
      price: 2.99,
      quantity: 100,
      categories: ['test'],
    }).then(_product => {
      product = _product;
    })
  );

  describe('GET /', () => {
    it('returns all products (public, no auth required)', () =>
      request(app)
        .get('/api/products')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array');
          expect(res.body.length).to.be.greaterThan(0);
        }));
  });

  describe('GET /:id', () => {
    it('returns a single product by id', () =>
      request(app)
        .get('/api/products/' + product.id)
        .expect(200)
        .then(res => {
          expect(res.body).to.have.property('id', product.id);
          expect(res.body).to.have.property('name', 'Test Cookie');
        }));

    it('returns 404 for a non-existent product', () =>
      request(app).get('/api/products/999999').expect(404));
  });

  describe('POST / (admin)', () => {
    let createdId;

    it('creates a new product when logged in as admin', () =>
      agent
        .post('/api/products')
        .send({
          name: 'New Cookie',
          description: 'A freshly baked cookie',
          price: 3.49,
          quantity: 50,
          categories: ['new'],
        })
        .expect(200)
        .then(res => {
          createdId = res.body.id;
          expect(res.body).to.have.property('name', 'New Cookie');
          expect(res.body).to.have.property(
            'description',
            'A freshly baked cookie'
          );
        }));

    describe('PUT /:id (admin)', () => {
      it('updates an existing product when logged in as admin', function () {
        if (!createdId) return this.skip();
        return agent
          .put('/api/products/' + createdId)
          .send({ name: 'Updated Cookie', price: 4.99 })
          .expect(200)
          .then(res => {
            expect(res.body).to.have.property('name', 'Updated Cookie');
          });
      });
    });

    describe('DELETE /:id (admin)', () => {
      it('deletes a product when logged in as admin', function () {
        if (!createdId) return this.skip();
        return agent.delete('/api/products/' + createdId).expect(200);
      });
    });
  });
});
