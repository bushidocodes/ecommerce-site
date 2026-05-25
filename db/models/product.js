'use strict'

const bcrypt = require('bcrypt')
const Sequelize = require('sequelize')
const db = require('../../db')
const Review = require('./review')

const Product = db.define('products', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      // TODO: Enforce unique names for products
    },
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  price: {
    type: Sequelize.DECIMAL(16, 2),
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  quantity: {
    // This is the remaining product inventory
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
      min: 0,
    },
  },
  photo: {
    type: Sequelize.STRING,
  },
  categories: Sequelize.ARRAY(Sequelize.STRING),
})

module.exports = Product
