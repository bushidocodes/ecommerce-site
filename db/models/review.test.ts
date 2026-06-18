import db from '../../db/index.js';
import Review from './review.js';
import { expect } from 'chai';

describe('Review', () => {
  before('wait for the db', () => db.didSync);

  describe('Persistence to the db', () => {
    xit('Does not allow a title to be null', () =>
      Review.create({
        // @ts-expect-error intentionally passing null to verify the DB rejects it
        title: null,
        body: 'oops!',
        rating: 3,
        photo: 'http://www.yahoo.com/donald_trump_golden_shower.jpg',
      }).then(result => console.log(result)));
  });
});
