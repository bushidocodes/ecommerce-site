import express from 'express';
import Product from '../db/models/product.js';
import { mustBeLoggedIn } from './auth.filters.js';

export default express
  .Router()

  .get('/', async (req, res, next) => {
    try {
      const products = await Product.findAll();
      if (products.length > 0) {
        res.json(products);
      } else {
        res.sendStatus(404);
      }
    } catch (err) {
      next(err);
    }
  })

  .post('/', mustBeLoggedIn, async (req, res, next) => {
    if (!req.user!.isAdmin) return res.sendStatus(403);
    try {
      const product = await Product.create(req.body);
      res.json(product);
    } catch (err) {
      next(err);
    }
  })

  .param('id', async function (req, res, next) {
    try {
      const product = await Product.findByPk(String(req.params.id));
      if (product) {
        req.product = product;
        next();
      } else {
        res.sendStatus(404);
      }
    } catch (err) {
      next(err);
    }
  })

  .get('/:id', (req, res) => {
    res.status(200).json(req.product);
  })

  .put('/:id', mustBeLoggedIn, async (req, res, next) => {
    if (!req.user!.isAdmin) return res.sendStatus(403);
    try {
      const product = await req.product!.update(req.body);
      res.status(200).json(product);
    } catch (err) {
      next(err);
    }
  })

  .delete('/:id', mustBeLoggedIn, async (req, res, next) => {
    if (!req.user!.isAdmin) return res.sendStatus(403);
    try {
      await req.product!.destroy();
      res.sendStatus(200);
    } catch (err) {
      next(err);
    }
  });
