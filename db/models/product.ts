import { DataTypes, Model } from 'sequelize';
import db from '../sequelize.js';
import type { OrderLineItemInstance } from './orderLineItem.js';

export interface ProductInstance extends Model {
  id: number;
  name: string;
  description: string;
  price: string;
  quantity: number;
  photo: string | null;
  categories: string[] | null;

  // Present on products eager-loaded through an order's many-to-many join.
  orderLineItems?: OrderLineItemInstance;
}

const Product = db.define<ProductInstance>('products', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  price: {
    type: DataTypes.DECIMAL(16, 2),
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
      min: 0,
    },
  },
  photo: {
    type: DataTypes.STRING,
  },
  categories: DataTypes.ARRAY(DataTypes.STRING),
});

export default Product;
