const db = require('../db')
const Review = require('../db/models/review')

module.exports = require('express')
  .Router()

  // Action: View all reviews
  // Roles: Guest, User, Admin
  .get('/', (req, res, next) =>
    Review.findAll()
      .then(reviews => res.json(reviews))
      .catch(next)
  )

  // Action: Create a new review
  // Roles: User, Admin
  // Notes: Should be limited to reviewing a product that the
  //   User has actually ordered.
  .post('/', (req, res, next) =>
    Review.create(req.body)
      .then(review => res.status(201).json(review))
      .catch(next)
  )

  // TODO: Implement router param for review ID

  // Action: View a single review by ID
  // Roles: Guest, User, Admin
  .get('/:id', (req, res, next) =>
    Review.findByPk(req.params.id)
      .then(review => res.json(review))
      .catch(next)
  )

// Action: Modify a single existing review by ID
// Roles: User, Admin
// Notes: Users can only modify reviews that they wrote
// TODO: Implement put route for modifying a single review
// .put('/:id', (req, res, next)

// Action: Delete a single existing review by ID
// Roles: User, Admin
// Notes: Users can only modify delete that they wrote
// TODO: Implement delete route for deleting a single review
// .put('/:id', (req, res, next)
