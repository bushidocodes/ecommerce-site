import request from 'supertest';
import db from '../db/index.js';
import User from '../db/models/user.js';
import app from './start.js';

const alice = {
  name: 'Alice Malice',
  username: 'alice@secrets.org',
  password: '12345',
};

describe('/api/auth', () => {
  beforeAll(async () => {
    await db.didSync;
    await User.create({
      name: alice.name,
      email: alice.username,
      password: alice.password,
    });
  });

  describe('POST /local/login (username, password)', () => {
    it('succeeds with a valid username and password', () =>
      request(app)
        .post('/api/auth/local/login')
        .send(alice)
        .expect(302)
        .expect('Set-Cookie', /session=.*/)
        .expect('Location', '/'));

    it('fails with an invalid username and password', () =>
      request(app)
        .post('/api/auth/local/login')
        .send({ username: alice.username, password: 'wrong' })
        .expect(401));
  });

  describe('GET /whoami', () => {
    describe('when logged in,', () => {
      const agent = request.agent(app);
      beforeAll(() => agent.post('/api/auth/local/login').send(alice));

      it('responds with the currently logged in user', async () => {
        const res = await agent
          .get('/api/auth/whoami')
          .set('Accept', 'application/json')
          .expect(200);
        expect(res.body).toMatchObject({ email: alice.username });
      });
    });

    it('when not logged in, responds with an empty object', async () => {
      const res = await request(app).get('/api/auth/whoami').expect(200);
      expect(res.body).toEqual({});
    });
  });

  describe('POST /logout when logged in', () => {
    const agent = request.agent(app);

    beforeAll(() => agent.post('/api/auth/local/login').send(alice));

    it('logs you out and redirects to whoami', async () => {
      await agent
        .post('/api/auth/logout')
        .expect(302)
        .expect('Location', '/api/auth/whoami');
      const res = await agent.get('/api/auth/whoami').expect(200);
      expect(res.body).toEqual({});
    });
  });
});
