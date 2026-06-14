import Sequelize from 'sequelize';
import db from '../sequelize.js';

const Order = db.define(
  'orders',
  {
    status: {
      type: Sequelize.ENUM('created', 'processing', 'cancelled', 'completed'),
      defaultValue: 'created',
      allowNull: false,
    },
    shippingRate: {
      type: Sequelize.DECIMAL(16, 2),
      defaultValue: 3.95,
      validate: {
        notEmpty: true,
      },
    },
    shippingCarrier: {
      type: Sequelize.ENUM('USPS', 'UPS', 'FedEx'),
      allowNull: true,
    },
    trackingNumber: {
      type: Sequelize.STRING,
      allowNull: true,
    },
  },
  {
    indexes: [{ fields: ['user_id'] }],
    getterMethods: {
      total: function () {
        let runningTotal = 0.0;
        return this.getProducts().then(products => {
          products.forEach(
            product => (runningTotal += product.orderLineItems.subtotal)
          );
          runningTotal += parseFloat(this.shippingRate);
          console.log(runningTotal);
          return runningTotal;
        });
      },
    },
  }
);

export default Order;
