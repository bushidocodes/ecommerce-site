import Sequelize from 'sequelize';
import db from '../sequelize.js';

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
    indexes: [{ fields: ['order_id'] }, { fields: ['product_id'] }],
    getterMethods: {
      subtotal: function () {
        return this.quantity * this.price;
      },
    },
  }
);

export default OrderLineItem;
