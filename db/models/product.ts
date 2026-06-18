import { DataTypes, Model } from 'sequelize';
import type { Optional } from 'sequelize';
import db from '../sequelize.js';
import type { OrderLineItemInstance } from './orderLineItem.js';

export interface ProductAttributes {
  id: number;
  name: string;
  description: string;
  // DECIMAL is read back as a string; writes accept a number or string.
  price: number | string;
  quantity: number;
  photo: string | null;
  categories: string[] | null;
}

type ProductCreationAttributes = Optional<
  ProductAttributes,
  'id' | 'photo' | 'categories'
>;

export interface ProductInstance
  extends Model<ProductAttributes, ProductCreationAttributes>,
    ProductAttributes {
  // Present on products eager-loaded through an order's many-to-many join.
  orderLineItems?: OrderLineItemInstance;
}

const Product = db.define<ProductInstance, Omit<ProductAttributes, 'id'>>(
  'products',
  {
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
  }
);

export default Product;
