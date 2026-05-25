'use strict'

const Sequelize = require('sequelize')
const db = require('../../db')
const Review = require('./user')
const { expect } = require('chai')

describe('Review', () => {
  before('wait for the db', () => db.didSync)

  // Some feedback on how best to test this type of functionality would be much appreciated -evan
  describe('Persistence to the db', () => {
    xit('Does not allow a title to be null', () =>
      Review.create({
        title: null,
        body: 'oops!',
        rating: 3,
        photo: 'http://www.yahoo.com/donald_trump_golden_shower.jpg',
      }).then(result => console.log(result)))

    // it('', () =>
    //   Review.create({ name: 'dude', password: 'ok' })
    //   .then(user => user.authenticate('not ok'))
    //   .then(result => expect(result).to.be.false));
  })
})
