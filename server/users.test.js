const request = require('supertest-as-promised')
const { expect } = require('chai')
const db = require('../db')
const User = require('../db/models/user')
const app = require('./start')

describe('/api/users', () => {
  describe('when not logged in', () => {
    it('GET /:id fails 401 (Unauthorized)', () =>
      request(app).get(`/api/users/1`).expect(401))

    it('POST creates a user', () =>
      request(app)
        .post('/api/users')
        .send({
          name: 'Beth the Spy',
          email: 'beth@secrets.org',
          password: '12345',
        })
        .expect(201))

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
        ))
  })
})
