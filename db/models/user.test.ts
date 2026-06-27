import db from '../../db/index.js';
import User from './user.js';

describe('User', () => {
  beforeAll(() => db.didSync);

  describe('billingZip / shippingZip', () => {
    it('preserves a leading-zero zip code', async () => {
      const user = await User.create({
        name: 'dude',
        password: 'ok',
        billingZip: '01234',
        shippingZip: '01234',
      });
      expect(user.billingZip).toBe('01234');
      expect(user.shippingZip).toBe('01234');
    });

    it('accepts ZIP+4 format', async () => {
      const user = await User.create({
        name: 'dude',
        password: 'ok',
        billingZip: '01234-5678',
      });
      expect(user.billingZip).toBe('01234-5678');
    });

    it('rejects a non-zip string', async () => {
      await expect(
        User.create({ name: 'dude', password: 'ok', billingZip: 'ABCDE' })
      ).rejects.toMatchObject({ name: 'SequelizeValidationError' });
    });
  });

  describe('authenticate(plaintext: String) ~> Boolean', () => {
    it('resolves true if the password matches', async () => {
      const user = await User.create({ name: 'dude', password: 'ok' });
      expect(await user.authenticate('ok')).toBe(true);
    });

    it("resolves false if the password doesn't match", async () => {
      const user = await User.create({ name: 'dude', password: 'ok' });
      expect(await user.authenticate('not ok')).toBe(false);
    });
  });
});
