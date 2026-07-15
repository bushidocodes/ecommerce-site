import express from 'express';
import Review from '../db/models/review.js';
import { mustBeLoggedIn } from './auth.filters.js';

export default express
  .Router()

  .get('/', async (_req, res, next) => {
    try {
      const reviews = await Review.findAll();
      res.json(reviews);
    } catch (err) {
      next(err);
    }
  })

  .post('/', mustBeLoggedIn, async (req, res, next) => {
    const { title, body, rating, photo, productId } = req.body;
    if (!productId) return res.status(400).send('productId is required');
    try {
      const review = await Review.create({
        title,
        body,
        rating,
        photo,
        productId,
        userId: req.user!.id,
      });
      res.status(201).json(review);
    } catch (err) {
      next(err);
    }
  })

  .get('/:id', async (req, res, next) => {
    try {
      const review = await Review.findByPk(String(req.params.id));
      if (!review) return res.sendStatus(404);
      res.json(review);
    } catch (err) {
      next(err);
    }
  })

  .put('/:id', mustBeLoggedIn, async (req, res, next) => {
    try {
      const review = await Review.findByPk(String(req.params.id));
      if (!review) return res.sendStatus(404);
      if (!req.user!.isAdmin && review.userId !== req.user!.id) {
        return res.status(403).send('You can only edit your own reviews');
      }
      const { title, body, rating, photo } = req.body;
      const updated = await review.update({ title, body, rating, photo });
      res.json(updated);
    } catch (err) {
      next(err);
    }
  })

  .delete('/:id', mustBeLoggedIn, async (req, res, next) => {
    try {
      const review = await Review.findByPk(String(req.params.id));
      if (!review) return res.sendStatus(404);
      if (!req.user!.isAdmin && review.userId !== req.user!.id) {
        return res.status(403).send('You can only delete your own reviews');
      }
      await review.destroy();
      res.sendStatus(204);
    } catch (err) {
      next(err);
    }
  });
