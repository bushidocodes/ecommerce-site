import express from 'express';
import db from '../db/index.js';
import { mustBeLoggedIn, forbidden } from './auth.filters.js';

const User = db.model('users');

export default express
  .Router()

  .get('/', mustBeLoggedIn, async (req, res, next) => {
    if (!req.user.isAdmin)
      return forbidden(res, 'only admins can list all users');
    try {
      const users = await User.findAll();
      res.json(users);
    } catch (err) {
      next(err);
    }
  })

  .post('/', async (req, res, next) => {
    if (req.user) return res.status(403).send('Already logged in');
    const { name, email, password } = req.body;
    try {
      const user = await User.create({ name, email, password });
      res.status(201).json(user);
    } catch (err) {
      next(err);
    }
  })

  .param('id', mustBeLoggedIn, async function (req, res, next) {
    try {
      const user = await User.findByPk(req.params.id);
      if (user) {
        req.foundUser = user;
        next();
      } else {
        res.sendStatus(404);
      }
    } catch (err) {
      next(err);
    }
  })

  .get('/:id', (req, res) => {
    if (!req.user.isAdmin && String(req.user.id) !== String(req.params.id)) {
      return forbidden(res, 'You may only view your own profile');
    }
    res.status(200).json(req.foundUser);
  });
