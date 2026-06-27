import db from '../../db/index.js';
import Product from './product.js';
import type { ProductInstance } from './product.js';

describe('Product', () => {
  let testCookie: ProductInstance;

  beforeAll(async () => {
    await db.didSync;
    testCookie = await Product.create({
      name: 'Chocolate Chip',
      description: 'The classic. Enjoy with a tall glass of cold milk.',
      price: '1.50',
      quantity: 250,
      photo: 'images/cookies/chocolate-chip.jpg',
      categories: ['chocolate', 'classic'],
    });
  });

  describe('check if cookie has been created', () => {
    it('makes sure the cookie has a name', () => {
      expect(testCookie.name).toBe('Chocolate Chip');
    });
  });
});
