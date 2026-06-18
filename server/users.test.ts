import request from 'supertest';
import { expect } from 'chai';
import db from '../db/index.js';
import User from '../db/models/user.js';
import type { UserInstance } from '../db/models/user.js';
import app from './start.js';

const alice = { name: 'Alice', email: 'alice@example.com', password: '12345' };
const bob = { name: 'Bob', email: 'bob@example.com', password: '12345' };
const adminUser = {
  name: 'Admin',
  email: 'admin@example.com',
  password: '12345',
  isAdmin: true,
};

describe('/api/users', () => {
  describe('when not logged in', () => {
    before(() => db.didSync);

    it('GET /:id fails 401 (Unauthorized)', () =>
      request(app).get(`/api/users/1`).expect(401));

    it('POST creates a user', () =>
      request(app)
        .post('/api/users')
        .send({
          name: 'Beth the Spy',
          email: 'beth@secrets.org',
          password: '12345',
        })
        .expect(201));

    xit('POST redirects to the user it just made', () =>
      request(app)
        .post('/api/users')
        .send({
          email: 'eve@interloper.com',
          password: '23456',
        })
        .redirects(1)
        .then(res =>
          expect(res.body).to.contain({
            email: 'eve@interloper.com',
          })
        ));
  });

  describe('GET /:id', () => {
    describe('as the owner', () => {
      const agent = request.agent(app);
      let user: UserInstance;
      before(() =>
        db.didSync
          .then(() => User.create(alice))
          .then(_user => {
            user = _user;
            return agent
              .post('/api/auth/local/login')
              .send({ username: alice.email, password: alice.password });
          })
      );
      after(() => user.destroy());

      it('returns 200 with the user body', () =>
        agent
          .get(`/api/users/${user.id}`)
          .expect(200)
          .then(res => {
            expect(res.body).to.be.an('object');
            expect(res.body.id).to.equal(user.id);
            expect(res.body.email).to.equal(alice.email);
          }));
    });

    describe('as a different non-admin user', () => {
      const agent = request.agent(app);
      let userA: UserInstance, userB: UserInstance;
      before(() =>
        db.didSync
          .then(() => Promise.all([User.create(alice), User.create(bob)]))
          .then(([a, b]) => {
            userA = a;
            userB = b;
            return agent
              .post('/api/auth/local/login')
              .send({ username: bob.email, password: bob.password });
          })
      );
      after(() => Promise.all([userA.destroy(), userB.destroy()]));

      it('returns 403 Forbidden', () =>
        agent.get(`/api/users/${userA.id}`).expect(403));
    });

    describe('as an admin', () => {
      const agent = request.agent(app);
      let user: UserInstance, admin: UserInstance;
      before(() =>
        db.didSync
          .then(() => Promise.all([User.create(alice), User.create(adminUser)]))
          .then(([_user, _admin]) => {
            user = _user;
            admin = _admin;
            return agent.post('/api/auth/local/login').send({
              username: adminUser.email,
              password: adminUser.password,
            });
          })
      );
      after(() => Promise.all([user.destroy(), admin.destroy()]));

      it('returns 200 with the requested user body', () =>
        agent
          .get(`/api/users/${user.id}`)
          .expect(200)
          .then(res => {
            expect(res.body).to.be.an('object');
            expect(res.body.id).to.equal(user.id);
          }));
    });

    describe('for a non-existent id', () => {
      const agent = request.agent(app);
      let user: UserInstance;
      before(() =>
        db.didSync
          .then(() => User.create(alice))
          .then(_user => {
            user = _user;
            return agent
              .post('/api/auth/local/login')
              .send({ username: alice.email, password: alice.password });
          })
      );
      after(() => user.destroy());

      it('returns 404', () =>
        agent.get('/api/users/99999999').expect(404));
    });
  });
});
