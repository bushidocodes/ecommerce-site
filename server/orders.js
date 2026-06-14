import createDebug from 'debug';
import express from 'express';
import Order from '../db/models/order.js';
import Product from '../db/models/product.js';
import User from '../db/models/user.js';
import { mustBeLoggedIn, forbidden } from './auth.filters.js';

const debug = createDebug('cookie-monsters:orders');

const PRODUCT_INCLUDE = {
  model: Product,
  through: { attributes: ['quantity', 'price'] },
};

async function resolveOrder(order) {
  const { id, status, shippingRate, shippingCarrier, trackingNumber, created_at, products, total } = order;
  return { id, status, shippingRate, shippingCarrier, trackingNumber, created_at, products, total: await total };
}

export default express
  .Router()

  .get('/', async (req, res, next) => {
    debug('get /api/orders/');
    try {
      if (req.user?.isAdmin) {
        debug('is an admin');
        const orders = await Order.findAll({ include: [PRODUCT_INCLUDE] });
        return res.json(await Promise.all(orders.map(resolveOrder)));
      } else if (req.user) {
        debug('else if req.user');
        const orders = await req.user.getOrders({ include: [PRODUCT_INCLUDE] });
        return res.status(200).json(await Promise.all(orders.map(resolveOrder)));
      } else {
        res.status(403).send('Cannot view without req.user');
      }
    } catch (err) {
      next(err);
    }
  })

  .post('/:userId?', async (req, res, next) => {
    const orderLineItems = req.body?.orderLineItems ?? null;
    const productIds = orderLineItems ? Object.keys(orderLineItems) : [];
    debug('POST /:userId? userId=%s', req.params.userId);

    try {
      if (req.user?.isAdmin) {
        debug('user is an admin');
        if (req.params?.userId) {
          debug('userId=%s specified as param', req.params.userId);
          const user = await User.findByPk(req.params.userId);
          const order = await user.createOrder(req.body);
          const products = await Promise.all(productIds.map(id => Product.findByPk(id)));
          if (products) {
            products.forEach(product =>
              order.addProduct(product, {
                through: {
                  quantity: orderLineItems[product.id].quantity,
                  price: product.price,
                },
              })
            );
          }
          return res.sendStatus(200);
        } else {
          debug('no userId param, creating unassociated order');
          const order = await Order.create(req.body);
          const products = await Promise.all(productIds.map(id => Product.findByPk(id)));
          if (products) {
            await Promise.all(
              products.map(product => {
                const qty = orderLineItems[product.id].quantity;
                if (product.quantity < qty) {
                  return res.status(409).json({
                    error: `Insufficient inventory for product ${product.id}`,
                  });
                }
                return order
                  .addProduct(product, {
                    through: { quantity: qty, price: product.price },
                  })
                  .then(() => product.decrement('quantity', { by: qty }));
              })
            );
          }
          const fullOrder = await Order.findByPk(order.id, { include: [PRODUCT_INCLUDE] });
          return res.status(200).json(fullOrder);
        }
      } else if (req.user) {
        debug('user is not an admin');
        const order = await req.user.createOrder(req.body);
        const products = await Promise.all(productIds.map(id => Product.findByPk(id)));
        if (products) {
          await Promise.all(
            products.map(product => {
              const qty = orderLineItems[product.id].quantity;
              if (product.quantity < qty) {
                return res.status(409).json({
                  error: `Insufficient inventory for product ${product.id}`,
                });
              }
              return order
                .addProduct(product, {
                  through: { quantity: qty, price: product.price },
                })
                .then(() => product.decrement('quantity', { by: qty }));
            })
          );
        }
        const fullOrder = await Order.findByPk(order.id, { include: [PRODUCT_INCLUDE] });
        debug('order=%O', fullOrder);
        return res.status(200).json(fullOrder);
      } else {
        debug('no user logged in, creating guest order');
        const order = await Order.create(req.body);
        const products = await Promise.all(productIds.map(id => Product.findByPk(id)));
        if (products) {
          await Promise.all(
            products.map(product =>
              order.addProduct(product, {
                through: {
                  quantity: orderLineItems[product.id].quantity,
                  price: product.price,
                },
              })
            )
          );
        }
        const fullOrder = await Order.findByPk(order.id, { include: [PRODUCT_INCLUDE] });
        return res.status(200).json(fullOrder);
      }
    } catch (err) {
      next(err);
    }
  })

  .get('/:id', mustBeLoggedIn, async (req, res, next) => {
    if (!req.user.isAdmin) return forbidden(res, 'You are not authorized to do this.');
    try {
      const order = await Order.findByPk(req.params.id, { include: [PRODUCT_INCLUDE] });
      res.json(await resolveOrder(order));
    } catch (err) {
      next(err);
    }
  })

  .put('/:id', mustBeLoggedIn, async (req, res, next) => {
    if (!req.user.isAdmin) return forbidden(res, 'You are not authorized to do this.');
    try {
      const order = await Order.findByPk(req.params.id);
      const updated = await order.update(req.body);
      res.status(200).json(updated);
    } catch (err) {
      next(err);
    }
  })

  .delete('/:id/', mustBeLoggedIn, async (req, res, next) => {
    if (!req.user.isAdmin) return forbidden(res, 'You are not authorized to do this.');
    try {
      const order = await Order.findByPk(req.params.id);
      await order.destroy();
      res.sendStatus(200);
    } catch (err) {
      next(err);
    }
  })

  .post('/:id/products/', mustBeLoggedIn, async (req, res, next) => {
    if (!req.user.isAdmin) return forbidden(res, 'You are not authorized to do this.');
    const orderLineItems = req.body.orderLineItems;
    const productIds = Object.keys(orderLineItems);
    try {
      const order = await Order.findByPk(req.params.id);
      const products = await Promise.all(productIds.map(id => Product.findByPk(id)));
      products.forEach(product =>
        order.addProduct(product, {
          through: {
            quantity: orderLineItems[product.id].quantity,
            price: product.price,
          },
        })
      );
      res.sendStatus(200);
    } catch (err) {
      next(err);
    }
  })

  .delete('/:orderId/products/:productId', mustBeLoggedIn, async (req, res, next) => {
    if (!req.user.isAdmin) return forbidden(res, 'You are not authorized to do this.');
    try {
      const order = await Order.findByPk(req.params.orderId);
      await order.removeProduct(req.params.productId);
      res.sendStatus(200);
    } catch (err) {
      next(err);
    }
  });
