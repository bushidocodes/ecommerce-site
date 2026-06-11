'use strict';

const Sequelize = require('sequelize');
const db = require('../../db');

const Review = db.define(
  'reviews',
  {
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    body: {
      type: Sequelize.TEXT,
    },
    rating: {
      type: Sequelize.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
        min: 1,
        max: 5,
      },
    },
    photo: {
      type: Sequelize.STRING,
      validate: {
        isUrl: true,
      },
    },
  },
  {
    indexes: [{ fields: ['product_id'] }, { fields: ['user_id'] }],
  }
);

module.exports = Review;
