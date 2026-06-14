import express from 'express';
import Product from '../db/models/product.js';
import { mustBeLoggedIn } from './auth.filters.js';

export default express
  .Router()

  .get('/', (req, res, next) =>
    Product.findAll()
      .then(products => {
        if (products.length > 0) {
          res.json(products);
        } else {
          res.sendStatus(404);
        }
      })
      .catch(next)
  )

  .post('/', mustBeLoggedIn, (req, res, next) => {
    if (!req.user.isAdmin) return res.sendStatus(403);
    Product.create(req.body)
      .then(product => res.json(product))
      .catch(next);
  })

  .param('id', function (req, res, next) {
    Product.findByPk(req.params.id)
      .then(product => {
        if (product) {
          req.product = product;
          next();
        } else {
          res.sendStatus(404);
        }
      })
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    res.status(200).json(req.product);
  })

  .put('/:id', mustBeLoggedIn, (req, res, next) => {
    if (!req.user.isAdmin) return res.sendStatus(403);
    req.product
      .update(req.body)
      .then(order => res.status(200).json(order))
      .catch(next);
  })

  .delete('/:id', mustBeLoggedIn, (req, res, next) => {
    if (!req.user.isAdmin) return res.sendStatus(403);
    req.product
      .destroy()
      .then(() => res.sendStatus(200))
      .catch(next);
  });
