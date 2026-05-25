const request = require('supertest-as-promised')
const { expect } = require('chai')
const db = require('../db')
const Review = require('../db/models/review')
const app = require('./start')

describe('/api/reviews', () => {
  describe('Basic functionality', () => {
    it('GET / returns all reviews', () =>
      request(app).get(`/api/reviews`).expect(200))

    it('POST creates a review', () =>
      request(app)
        .post('/api/reviews')
        .send({
          title: 'Your products are terrible!',
          email: 'angrycustomer@altivista.net',
          rating: 1,
        })
        .expect(201))

    it('GET /:id returns (1) review by id', () =>
      request(app).get('/api/reviews/1').expect(200))
  })
})
