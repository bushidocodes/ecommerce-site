import request from 'supertest';
import db from '../db/index.js';
import User from '../db/models/user.js';
import type { UserInstance } from '../db/models/user.js';
import Order from '../db/models/order.js';
import type { OrderInstance } from '../db/models/order.js';
import Product from '../db/models/product.js';
import type { ProductInstance } from '../db/models/product.js';
import app from './start.js';

const bobTheAdmin = {
  name: 'bobTheAdmin',
  username: 'bob@admins.org',
  password: '12345',
  isAdmin: true,
};

const dallas = {
  name: 'Dallas Malice',
  username: 'dallas@secrets.org',
  password: '12345',
  isAdmin: false,
};

describe('/api/orders/', () => {
  describe('GET / (as Non-Admin)', () => {
    const agent = request.agent(app);
    let user: UserInstance,
      associatedOrder: OrderInstance,
      unassociatedOrder: OrderInstance;
    beforeAll(async () => {
      await db.didSync;
      user = await User.create({
        name: dallas.name,
        email: dallas.username,
        password: dallas.password,
      });
      await agent.post('/api/auth/local/login').send(dallas);
      associatedOrder = await user.createOrder();
      unassociatedOrder = await Order.create();
    });
    afterAll(async () => {
      await Promise.all([
        associatedOrder.destroy(),
        unassociatedOrder.destroy(),
        user.destroy(),
      ]);
      await agent.post('/logout');
    });

    it('returns only the logged-in user orders', async () => {
      const res = await agent.get('/api/orders/').expect(200);
      expect(res.body).toHaveLength(1);
      expect(res.body[0].id).toBe(associatedOrder.id);
    });
  });

  describe('GET / (as Admin)', () => {
    let user: UserInstance, order: OrderInstance;
    const agent = request.agent(app);
    beforeAll(async () => {
      await db.didSync;
      user = await User.create({
        name: bobTheAdmin.name,
        email: bobTheAdmin.username,
        password: bobTheAdmin.password,
        isAdmin: bobTheAdmin.isAdmin,
      });
      await agent.post('/api/auth/local/login').send(bobTheAdmin);
      order = await Order.create();
    });
    afterAll(async () => {
      await user.destroy();
      await agent.post('/logout');
    });

    it("returns other user's orders if admin", async () => {
      const res = await agent.get('/api/orders/').expect(200);
      expect(res.body[0].id).toBe(order.id);
    });
  });

  describe('POST / (as Guest)', () => {
    let product: ProductInstance, orderId: number;
    beforeAll(async () => {
      await db.didSync;
      product = await Product.create({
        name: 'Sugar Cookie',
        description: 'Simple and sweet',
        price: 2.0,
        quantity: 50,
        categories: [],
      });
    });

    it('returns 200 with JSON order body (not a bare status)', async () => {
      const res = await request(app)
        .post('/api/orders/')
        .send({
          shippingCarrier: 'FedEx',
          orderLineItems: {
            [product.id]: { quantity: 3 },
          },
        })
        .expect(200);
      orderId = res.body.id;
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body).toHaveProperty('id');
      expect(res.body.shippingCarrier).toBe('FedEx');
    });

    it('persists quantity and price on the join table (through: {} fix)', async () => {
      const res = await request(app)
        .post('/api/orders/')
        .send({
          shippingCarrier: 'FedEx',
          orderLineItems: {
            [product.id]: { quantity: 5 },
          },
        })
        .expect(200);
      expect(Array.isArray(res.body.products)).toBe(true);
      expect(res.body.products).toHaveLength(1);
      const lineItem = res.body.products[0].orderLineItems;
      expect(lineItem).toHaveProperty('quantity', 5);
      expect(Number(lineItem.price)).toBe(Number(product.price));
    });

    afterAll(async () => {
      await Promise.all([
        product.destroy(),
        orderId
          ? Order.findByPk(orderId).then(o => o && o.destroy())
          : Promise.resolve(),
      ]);
    });
  });

  describe('POST / (as Non-Admin)', () => {
    const agent = request.agent(app);
    let user: UserInstance, product: ProductInstance, id: number;
    beforeAll(async () => {
      await db.didSync;
      product = await Product.create({
        name: 'Chocolate Chip',
        description: 'Classic cookie',
        price: 1.5,
        quantity: 100,
        categories: [],
      });
      user = await User.create({
        name: dallas.name,
        email: dallas.username,
        password: dallas.password,
      });
      await agent.post('/api/auth/local/login').send(dallas);
    });

    it('adds an order associated with the current logged in user', async () => {
      const res = await agent
        .post('/api/orders/')
        .send({
          status: 'cancelled',
          shippingRate: 9.99,
          shippingCarrier: 'UPS',
          trackingNumber: null,
          orderLineItems: {
            [product.id]: { quantity: 10 },
          },
        })
        .expect(200);
      id = res.body.id;
      expect(res.body.shippingCarrier).toBe('UPS');
      expect(res.body).toHaveProperty('id');
      expect(res.body.userId).toBe(user.id);
    });

    afterAll(async () => {
      await agent.post('/logout');
      await Promise.all([
        user.destroy(),
        product.destroy(),
        id
          ? Order.findByPk(id).then(order => order && order.destroy())
          : Promise.resolve(),
      ]);
    });
  });

  describe('POST / (as Admin)', () => {
    const agent = request.agent(app);
    let user: UserInstance, id: number;
    beforeAll(async () => {
      await db.didSync;
      user = await User.create({
        name: bobTheAdmin.name,
        email: bobTheAdmin.username,
        password: bobTheAdmin.password,
        isAdmin: bobTheAdmin.isAdmin,
      });
      await agent.post('/api/auth/local/login').send(bobTheAdmin);
    });

    it('adds an order unassociated with a particular user', async () => {
      const res = await agent
        .post('/api/orders/')
        .send({ shippingCarrier: 'USPS' })
        .expect(200);
      id = res.body.id;
      expect(res.body.shippingCarrier).toBe('USPS');
      expect(res.body).toHaveProperty('id');
      expect(res.body).toHaveProperty('userId');
      expect(res.body.userId).toBeNull();
    });

    afterAll(async () => {
      await agent.post('/logout');
      await user.destroy();
      const order = await Order.findByPk(id);
      await order?.destroy();
    });
  });
});
