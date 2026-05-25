const request = require('supertest-as-promised')
const { expect } = require('chai')
const db = require('../db')
const Product = require('../db/models/product')
const app = require('./start')

describe('/api/products', () => {
  describe('GET /', () => {
    // We should insert two products using Sequelize, call the route, and check that
    // the output returned 200 and contained the products we inserted.
    xit('returns all types of cookies', () =>
      request(app).get(`/api/products`).expect(200))
  })

  describe('GET /:id', () => {
    // We should insert a product using Sequelize, retrieve the product ID, and
    // then inoke the get /:id route with the product ID we retrieved to check
    // that we got the new product
    xit('returns (1) type of cookie by id', () =>
      request(app).get('/api/reviews/1').expect(200))
  })

  describe('POST / (????)', () => {
    // We should call the post route to create a product, and then check that
    // Sequelize returns what we passed into the post route.
    xit('creates a type of cookie', () =>
      request(app)
        .post('/api/reviews')
        .send({
          title: 'Your products are terrible!',
          email: 'angrycustomer@altivista.net',
          rating: 1,
        })
        .expect(201))
  })

  describe('PUT / (????)', () => {
    // Modify a cookie by id
    xit('modifies the characteristics of a type of cookie', () =>
      request(app)
        .post('/api/reviews')
        .send({
          title: 'Your products are terrible!',
          email: 'angrycustomer@altivista.net',
          rating: 1,
        })
        .expect(201))
  })

  describe('DELETE /:id', () => {
    // Modify a cookie by id
    xit('removes a type of cookie', () =>
      request(app)
        .post('/api/reviews')
        .send({
          title: 'Your products are terrible!',
          email: 'angrycustomer@altivista.net',
          rating: 1,
        })
        .expect(201))
  })
})
