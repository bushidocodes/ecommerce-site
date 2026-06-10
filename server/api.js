'use strict';

const db = require('../db');
const api = (module.exports = require('express').Router());

api
  .get('/heartbeat', (req, res) => res.send({ ok: true }))
  .use('/auth', require('./auth'))
  .use('/users', require('./users'))
  .use('/products', require('./products'))
  .use('/orders', require('./orders'))
  .use('/reviews', require('./reviews'));

// Send along any errors AND LOG OUT TO SERVER
api.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

// No routes matched? 404.
api.use((req, res) => res.status(404).end());
