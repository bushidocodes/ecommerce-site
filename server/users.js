import express from 'express';
import db from '../db/index.js';
import { mustBeLoggedIn, forbidden } from './auth.filters.js';

const User = db.model('users');

export default express
  .Router()

  .get('/', mustBeLoggedIn, (req, res, next) => {
    if (req.user.isAdmin) {
      User.findAll()
        .then(users => res.json(users))
        .catch(next);
    } else {
      return forbidden(res, 'only admins can list all users');
    }
  })

  .post('/', (req, res, next) => {
    if (req.user) {
      return res.status(403).send('Already logged in');
    }
    const { name, email, password } = req.body;
    return User.create({ name, email, password })
      .then(user => res.status(201).json(user))
      .catch(next);
  })

  .param('id', mustBeLoggedIn, function (req, res, next) {
    User.findByPk(req.params.id)
      .then(user => {
        if (user) {
          req.foundUser = user;
          next();
        } else {
          res.sendStatus(404);
        }
      })
      .catch(next);
  })

  .get('/:id', (req, res, next) => {
    if (!req.user.isAdmin && String(req.user.id) !== String(req.params.id)) {
      return forbidden(res, 'You may only view your own profile');
    }
    return res.status(200).json(req.foundUser);
  });
