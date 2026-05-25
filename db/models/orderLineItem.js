'use strict'

const Order = require('./order.js')
const Product = require('./product.js')
const Sequelize = require('sequelize')
const db = require('../../db')

// An OrderLineItem is effectively a join table with extra attributes

// Example Syntax for adding a product to an order
// TODO: Make sure that we're passing by value

// currentOrder.addProduct(selectedProduct, {
//   quantity: 1,
//   price: selectedProduct.price
// })

const OrderLineItem = db.define(
  'orderLineItems',
  {
    quantity: {
      type: Sequelize.INTEGER,
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
  },
  {
    getterMethods: {
      subtotal: function () {
        return this.quantity * this.price
      },
    },
  }
)

module.exports = OrderLineItem
