'use strict'

const db = require('../db')
const User = db.model('users')

const { mustBeLoggedIn, selfOnlyOrAdmin, forbidden } = require('./auth.filters')
// const selfOrAdmin = selfOnlyOrAdmin("select");
// console.log(selfOnlyOrAdmin("select"));
module.exports = require('express')
  .Router()

  // Action: View All users
  // Roles: Admin
  // Notes:
  .get('/', mustBeLoggedIn, (req, res, next) => {
    if (req.user.isAdmin) {
      User.findAll()
        .then(users => res.json(users))
        .catch(next)
    } else {
      forbidden('only admins can list all users')
    }
  })

  // Action: Create a new user
  // Roles: Guest, Admin
  // Notes: A signed in user should not be able to create a new user
  // TODO: Harden this route.
  .post('/', (req, res, next) => {
    //selfOnlyOrAdmin,
    return User.create(req.body)
      .then(user => res.status(201).json(user))
      .catch(next)
  })

  // Action: Param for User ID
  // Roles: User, Admin
  // Notes: A User should only be able to see their own stuff
  .param('id', mustBeLoggedIn, function (req, res, next) {
    //selfOnlyOrAdmin,
    User.findByPk(req.params.id)
      .then(user => {
        if (user) {
          req.foundUser = user //DO NOT KLOBBER PASSPORT BY USING REQ.USER!!!!
          next()
        } else {
          res.sendStatus(404)
        }
      })
      .catch(next)
  })

  // Action: Get user by ID
  // Roles: User, Admin
  // Notes:
  .get('/:id', (req, res, next) => res.status(200).json(req.foundUser))

// Action: Modify user by ID
// Roles: User, Admin
// Notes:
// TODO: Implement
// .put('/:id', (req, res, next) =>
// 	res.status(200).json(req.foundUser))

// Action: Delete user by ID
// Roles: User, Admin
// Notes:
// TODO: Implement delete
// .delete('/:id', (req, res, next) =>
// 	res.status(200).json(req.foundUser))
