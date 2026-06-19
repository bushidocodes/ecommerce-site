import db from '../../db/index.js';
import Product from './product.js';
import type { ProductInstance } from './product.js';
import { expect } from 'chai';

describe('Product', () => {
  beforeAll(() => db.didSync);

  let testCookie: ProductInstance;
  beforeAll(() => {
    return Product.create({
      name: 'Chocolate Chip',
      description: 'The classic. Enjoy with a tall glass of cold milk.',
      price: '1.50',
      quantity: 250,
      photo: 'images/cookies/chocolate-chip.jpg',
      categories: ['chocolate', 'classic'],
    }).then(result => (testCookie = result));
  });

  describe('check if cookie has been created', () => {
    it('makes sure the cookie has a name', () =>
      expect(testCookie.name).to.equal('Chocolate Chip'));
  });
});
