import request from 'supertest';
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
    beforeAll(() => db.didSync);

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

    it.skip('POST redirects to the user it just made', async () => {
      const res = await request(app)
        .post('/api/users')
        .send({
          email: 'eve@interloper.com',
          password: '23456',
        })
        .redirects(1);
      expect(res.body).toMatchObject({ email: 'eve@interloper.com' });
    });
  });

  describe('GET /:id', () => {
    describe('as the owner', () => {
      const agent = request.agent(app);
      let user: UserInstance;
      beforeAll(async () => {
        await db.didSync;
        user = await User.create(alice);
        await agent
          .post('/api/auth/local/login')
          .send({ username: alice.email, password: alice.password });
      });
      afterAll(() => user.destroy());

      it('returns 200 with the user body', async () => {
        const res = await agent.get(`/api/users/${user.id}`).expect(200);
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body.id).toBe(user.id);
        expect(res.body.email).toBe(alice.email);
      });
    });

    describe('as a different non-admin user', () => {
      const agent = request.agent(app);
      let userA: UserInstance, userB: UserInstance;
      beforeAll(async () => {
        await db.didSync;
        [userA, userB] = await Promise.all([
          User.create(alice),
          User.create(bob),
        ]);
        await agent
          .post('/api/auth/local/login')
          .send({ username: bob.email, password: bob.password });
      });
      afterAll(() => Promise.all([userA.destroy(), userB.destroy()]));

      it('returns 403 Forbidden', () =>
        agent.get(`/api/users/${userA.id}`).expect(403));
    });

    describe('as an admin', () => {
      const agent = request.agent(app);
      let user: UserInstance, admin: UserInstance;
      beforeAll(async () => {
        await db.didSync;
        [user, admin] = await Promise.all([
          User.create(alice),
          User.create(adminUser),
        ]);
        await agent.post('/api/auth/local/login').send({
          username: adminUser.email,
          password: adminUser.password,
        });
      });
      afterAll(() => Promise.all([user.destroy(), admin.destroy()]));

      it('returns 200 with the requested user body', async () => {
        const res = await agent.get(`/api/users/${user.id}`).expect(200);
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body.id).toBe(user.id);
      });
    });

    describe('for a non-existent id', () => {
      const agent = request.agent(app);
      let user: UserInstance;
      beforeAll(async () => {
        await db.didSync;
        user = await User.create(alice);
        await agent
          .post('/api/auth/local/login')
          .send({ username: alice.email, password: alice.password });
      });
      afterAll(() => user.destroy());

      it('returns 404', () => agent.get('/api/users/99999999').expect(404));
    });
  });
});
