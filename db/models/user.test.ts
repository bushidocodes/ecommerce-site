import db from '../../db/index.js';
import User from './user.js';
import { expect } from 'chai';

describe('User', () => {
  beforeAll(() => db.didSync);

  describe('billingZip / shippingZip', () => {
    it('preserves a leading-zero zip code', () =>
      User.create({
        name: 'dude',
        password: 'ok',
        billingZip: '01234',
        shippingZip: '01234',
      }).then(user => {
        expect(user.billingZip).to.equal('01234');
        expect(user.shippingZip).to.equal('01234');
      }));

    it('accepts ZIP+4 format', () =>
      User.create({
        name: 'dude',
        password: 'ok',
        billingZip: '01234-5678',
      }).then(user => expect(user.billingZip).to.equal('01234-5678')));

    it('rejects a non-zip string', () =>
      User.create({ name: 'dude', password: 'ok', billingZip: 'ABCDE' })
        .then(() => {
          throw new Error('should have rejected');
        })
        .catch(err => expect(err.name).to.equal('SequelizeValidationError')));
  });

  describe('authenticate(plaintext: String) ~> Boolean', () => {
    it('resolves true if the password matches', () =>
      User.create({ name: 'dude', password: 'ok' })
        .then(user => user.authenticate('ok'))
        .then(result => expect(result).to.be.true));

    it("resolves false if the password doesn't match", () =>
      User.create({ name: 'dude', password: 'ok' })
        .then(user => user.authenticate('not ok'))
        .then(result => expect(result).to.be.false));
  });
});
