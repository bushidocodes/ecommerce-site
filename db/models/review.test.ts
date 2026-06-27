import db from '../../db/index.js';
import Review from './review.js';

describe('Review', () => {
  beforeAll(() => db.didSync);

  describe('Persistence to the db', () => {
    it.skip('Does not allow a title to be null', async () => {
      await expect(
        Review.create({
          // @ts-expect-error intentionally passing null to verify the DB rejects it
          title: null,
          body: 'oops!',
          rating: 3,
          photo: 'http://www.example.com/photo.jpg',
        })
      ).rejects.toThrow();
    });
  });
});
