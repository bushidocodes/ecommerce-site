const Review = require('../db/models/review')
const { mustBeLoggedIn } = require('./auth.filters')

module.exports = require('express')
  .Router()

  // Action: View all reviews (includes product and user associations)
  // Roles: Guest, User, Admin
  .get('/', (req, res, next) =>
    Review.findAll()
      .then(reviews => res.json(reviews))
      .catch(next)
  )

  // Action: Create a new review
  // Roles: User, Admin (must be logged in)
  // Hardened (#80): requires auth; only whitelisted fields accepted;
  //   productId is required so every review is associated with a product.
  .post('/', mustBeLoggedIn, (req, res, next) => {
    const { title, body, rating, photo, productId } = req.body
    if (!productId) {
      return res.status(400).send('productId is required')
    }
    return Review.create({ title, body, rating, photo, productId, userId: req.user.id })
      .then(review => res.status(201).json(review))
      .catch(next)
  })

  // Action: View a single review by ID
  // Roles: Guest, User, Admin
  .get('/:id', (req, res, next) =>
    Review.findByPk(req.params.id)
      .then(review => {
        if (!review) return res.sendStatus(404)
        res.json(review)
      })
      .catch(next)
  )

  // Action: Update a single review by ID (#78)
  // Roles: review author or Admin
  .put('/:id', mustBeLoggedIn, (req, res, next) =>
    Review.findByPk(req.params.id)
      .then(review => {
        if (!review) return res.sendStatus(404)
        if (!req.user.isAdmin && review.userId !== req.user.id) {
          return res.status(403).send('You can only edit your own reviews')
        }
        const { title, body, rating, photo } = req.body
        return review.update({ title, body, rating, photo })
      })
      .then(review => res.json(review))
      .catch(next)
  )

  // Action: Delete a single review by ID (#78)
  // Roles: review author or Admin
  .delete('/:id', mustBeLoggedIn, (req, res, next) =>
    Review.findByPk(req.params.id)
      .then(review => {
        if (!review) return res.sendStatus(404)
        if (!req.user.isAdmin && review.userId !== req.user.id) {
          return res.status(403).send('You can only delete your own reviews')
        }
        return review.destroy().then(() => res.sendStatus(204))
      })
      .catch(next)
  )
