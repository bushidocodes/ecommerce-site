import type { ErrorRequestHandler } from 'express';
import express from 'express';
import '../db/index.js';
import auth from './auth.js';
import orders from './orders.js';
import products from './products.js';
import reviews from './reviews.js';
import users from './users.js';

const api = express.Router();

api
  .get('/heartbeat', (_req, res) => res.send({ ok: true }))
  .use('/auth', auth)
  .use('/users', users)
  .use('/products', products)
  .use('/orders', orders)
  .use('/reviews', reviews);

const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
};
api.use(errorHandler);

api.use((_req, res) => res.status(404).end());

export default api;
