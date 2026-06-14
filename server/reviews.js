import Review from '../db/models/review.js';
import { mustBeLoggedIn } from './auth.filters.js';
import express from 'express';

export default express
  .Router()

  .get('/', (req, res, next) =>
    Review.findAll()
      .then(reviews => res.json(reviews))
      .catch(next)
  )

  .post('/', mustBeLoggedIn, (req, res, next) => {
    const { title, body, rating, photo, productId } = req.body;
    if (!productId) {
      return res.status(400).send('productId is required');
    }
    return Review.create({
      title,
      body,
      rating,
      photo,
      productId,
      userId: req.user.id,
    })
      .then(review => res.status(201).json(review))
      .catch(next);
  })

  .get('/:id', (req, res, next) =>
    Review.findByPk(req.params.id)
      .then(review => {
        if (!review) return res.sendStatus(404);
        res.json(review);
      })
      .catch(next)
  )

  .put('/:id', mustBeLoggedIn, (req, res, next) =>
    Review.findByPk(req.params.id)
      .then(review => {
        if (!review) return res.sendStatus(404);
        if (!req.user.isAdmin && review.userId !== req.user.id) {
          return res.status(403).send('You can only edit your own reviews');
        }
        const { title, body, rating, photo } = req.body;
        return review.update({ title, body, rating, photo });
      })
      .then(review => res.json(review))
      .catch(next)
  )

  .delete('/:id', mustBeLoggedIn, (req, res, next) =>
    Review.findByPk(req.params.id)
      .then(review => {
        if (!review) return res.sendStatus(404);
        if (!req.user.isAdmin && review.userId !== req.user.id) {
          return res.status(403).send('You can only delete your own reviews');
        }
        return review.destroy().then(() => res.sendStatus(204));
      })
      .catch(next)
  );
