import request from 'supertest';
import { expect } from 'chai';
import db from '../db/index.js';
import Review from '../db/models/review.js';
import User from '../db/models/user.js';
import type { UserInstance } from '../db/models/user.js';
import Product from '../db/models/product.js';
import type { ProductInstance } from '../db/models/product.js';
import app from './start.js';

const testUser = {
  name: 'Review Tester',
  username: 'reviewer@example.com',
  password: 'testpass',
};

describe('/api/reviews', () => {
  const agent = request.agent(app);
  let user: UserInstance, product: ProductInstance;

  beforeAll(() =>
    db.didSync
      .then(() =>
        Product.create({
          name: 'Test Cookie',
          description: 'A test cookie',
          price: 1.0,
          quantity: 50,
          categories: [],
        })
      )
      .then(_product => {
        product = _product;
        return User.create({
          name: testUser.name,
          email: testUser.username,
          password: testUser.password,
        });
      })
      .then(_user => {
        user = _user;
        return agent.post('/api/auth/local/login').send(testUser);
      })
  );

  describe('GET /', () => {
    it('returns all reviews (public, no auth required)', () =>
      request(app).get('/api/reviews').expect(200));
  });

  describe('POST / (authenticated)', () => {
    let createdId: number;

    it('creates a review when logged in with a productId', () =>
      agent
        .post('/api/reviews')
        .send({
          title: 'Absolutely delicious',
          body: 'Would order again.',
          rating: 5,
          productId: product.id,
        })
        .expect(201)
        .then(res => {
          createdId = res.body.id;
          expect(res.body.title).to.equal('Absolutely delicious');
        }));

    it('rejects review creation without auth (401)', () =>
      request(app)
        .post('/api/reviews')
        .send({ title: 'Ghost review', rating: 3, productId: product.id })
        .expect(401));

    it('rejects review creation without productId (400)', () =>
      agent
        .post('/api/reviews')
        .send({ title: 'No product', rating: 3 })
        .expect(400));

    describe('GET /:id', () => {
      it('returns the created review by id', ctx => {
        if (!createdId) return ctx.skip();
        return request(app).get(`/api/reviews/${createdId}`).expect(200);
      });
    });

    describe('PUT /:id', () => {
      it('updates a review the user owns', ctx => {
        if (!createdId) return ctx.skip();
        return agent
          .put(`/api/reviews/${createdId}`)
          .send({ title: 'Updated title', rating: 4 })
          .expect(200)
          .then(res => expect(res.body.title).to.equal('Updated title'));
      });
    });

    describe('DELETE /:id', () => {
      it('deletes a review the user owns', ctx => {
        if (!createdId) return ctx.skip();
        return agent.delete(`/api/reviews/${createdId}`).expect(204);
      });
    });
  });
});
