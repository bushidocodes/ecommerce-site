import Sequelize from 'sequelize';
import db from '../sequelize.js';

const Product = db.define('products', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
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
});

export default Product;
