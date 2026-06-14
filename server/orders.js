import createDebug from 'debug';
import express from 'express';
import Promise from 'bluebird';
import Order from '../db/models/order.js';
import Product from '../db/models/product.js';
import User from '../db/models/user.js';
import { mustBeLoggedIn, forbidden } from './auth.filters.js';

const debug = createDebug('cookie-monsters:orders');

export default express
  .Router()

  .get('/', (req, res, next) => {
    debug('get /api/orders/');
    if (req.user && req.user.isAdmin) {
      debug('is an admin');
      return Order.findAll({
        include: [
          {
            model: Product,
            through: {
              attributes: ['quantity', 'price'],
            },
          },
        ],
      })
        .then(orders => _promisifyOrderProps(orders))
        .then(orders => Promise.all(orders))
        .then(orders => res.json(orders))
        .catch(next);
    } else if (req.user) {
      debug('else if req.user');
      req.user
        .getOrders({
          include: [
            {
              model: Product,
              through: {
                attributes: ['quantity', 'price'],
              },
            },
          ],
        })
        .then(orders => _promisifyOrderProps(orders))
        .then(orders => Promise.all(orders))
        .then(orders => res.status(200).json(orders))
        .catch(next);
    } else {
      res.status(403).send('Cannot view without req.user');
    }
  })

  .post('/:userId?', (req, res, next) => {
    let order;
    let orderLineItems =
      req.body && req.body.orderLineItems ? req.body.orderLineItems : null;
    let productIds = orderLineItems ? Object.keys(orderLineItems) : [];
    debug('POST /:userId? userId=%s', req.params.userId);

    if (req.user && req.user.isAdmin) {
      debug('user is an admin');
      if (req.params && req.params.userId) {
        debug('userId=%s specified as param', req.params.userId);
        User.findByPk(req.params.userId)
          .then(user => user.createOrder(req.body))
          .then(_order => {
            order = _order;
            return Promise.all(
              productIds.map(productId => Product.findByPk(productId))
            );
          })
          .then(products => {
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
          })
          .then(() => res.sendStatus(200))
          .catch(next);
      } else {
        debug('no userId param, creating unassociated order');
        Order.create(req.body)
          .then(_order => {
            order = _order;
            return Promise.all(
              productIds.map(productId => Product.findByPk(productId))
            );
          })
          .then(products => {
            if (products) {
              return Promise.all(
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
          })
          .then(() =>
            Order.findByPk(order.id, {
              include: [
                {
                  model: Product,
                  through: {
                    attributes: ['quantity', 'price'],
                  },
                },
              ],
            })
          )
          .then(order => res.status(200).json(order))
          .catch(next);
      }
    } else if (req.user) {
      debug('user is not an admin');
      req.user
        .createOrder(req.body)
        .then(_order => {
          order = _order;
          return Promise.all(
            productIds.map(productId => Product.findByPk(productId))
          );
        })
        .then(products => {
          if (products) {
            return Promise.all(
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
        })
        .then(() =>
          Order.findByPk(order.id, {
            include: [
              {
                model: Product,
                through: {
                  attributes: ['quantity', 'price'],
                },
              },
            ],
          })
        )
        .then(order => {
          debug('order=%O', order);
          return res.status(200).json(order);
        })
        .catch(next);
    } else {
      debug('no user logged in, creating guest order');
      Order.create(req.body)
        .then(_order => {
          order = _order;
          return Promise.all(
            productIds.map(productId => Product.findByPk(productId))
          );
        })
        .then(products => {
          if (products) {
            return Promise.all(
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
        })
        .then(() =>
          Order.findByPk(order.id, {
            include: [
              {
                model: Product,
                through: {
                  attributes: ['quantity', 'price'],
                },
              },
            ],
          })
        )
        .then(order => res.status(200).json(order))
        .catch(next);
    }
  })

  .get('/:id', mustBeLoggedIn, (req, res, next) => {
    if (req.user.isAdmin) {
      return Order.findByPk(req.params.id, {
        include: [
          {
            model: Product,
            through: {
              attributes: ['quantity', 'price'],
            },
          },
        ],
      })
        .then(orders => _promisifyOrderProps(orders))
        .then(order => res.json(order))
        .catch(next);
    } else {
      return forbidden(res, 'You are not authorized to do this.');
    }
  })

  .put('/:id', mustBeLoggedIn, (req, res, next) => {
    if (req.user.isAdmin) {
      return Order.findByPk(req.params.id)
        .then(order => order.update(req.body))
        .then(order => res.status(200).json(order))
        .catch(next);
    } else {
      return forbidden(res, 'You are not authorized to do this.');
    }
  })

  .delete('/:id/', mustBeLoggedIn, (req, res, next) => {
    if (req.user.isAdmin) {
      return Order.findByPk(req.params.id)
        .then(order => order.destroy())
        .then(() => res.sendStatus(200))
        .catch(next);
    } else {
      return forbidden(res, 'You are not authorized to do this.');
    }
  })

  .post('/:id/products/', mustBeLoggedIn, (req, res, next) => {
    if (req.user.isAdmin) {
      let orderLineItems = req.body.orderLineItems;
      let productIds = Object.keys(orderLineItems);
      let order;
      Order.findByPk(req.params.id)
        .then(_order => {
          order = _order;
          return Promise.all(
            productIds.map(productId => Product.findByPk(productId))
          );
        })
        .then(products => {
          products.forEach(product =>
            order.addProduct(product, {
              through: {
                quantity: orderLineItems[product.id].quantity,
                price: product.price,
              },
            })
          );
        })
        .then(() => res.sendStatus(200))
        .catch(next);
    } else {
      return forbidden(res, 'You are not authorized to do this.');
    }
  })

  .delete('/:orderId/products/:productId', mustBeLoggedIn, (req, res, next) => {
    if (req.user.isAdmin) {
      return Order.findByPk(req.params.orderId)
        .then(order => order.removeProduct(req.params.productId))
        .then(() => res.sendStatus(200))
        .catch(next);
    } else {
      return forbidden(res, 'You are not authorized to do this.');
    }
  });

function _promisifyOrderProps(orders) {
  return orders.map(
    ({
      id,
      status,
      shippingRate,
      shippingCarrier,
      trackingNumber,
      created_at,
      products,
      total,
    }) =>
      Promise.props({
        id,
        status,
        shippingRate,
        shippingCarrier,
        trackingNumber,
        created_at,
        products,
        total,
      })
  );
}
