import { DataTypes, Model } from 'sequelize';
import db from '../sequelize.js';

export interface OrderLineItemAttributes {
  quantity: number;
  // DECIMAL is read back as a string; writes accept a number or string.
  price: number | string;
}

export interface OrderLineItemInstance
  extends Model<OrderLineItemAttributes, OrderLineItemAttributes>,
    OrderLineItemAttributes {
  readonly subtotal: number;
}

const OrderLineItem = db.define<OrderLineItemInstance>(
  'orderLineItems',
  {
    quantity: {
      type: DataTypes.INTEGER,
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
  },
  {
    indexes: [{ fields: ['order_id'] }, { fields: ['product_id'] }],
    getterMethods: {
      subtotal(this: OrderLineItemInstance) {
        return this.quantity * Number(this.price);
      },
    },
  }
);

export default OrderLineItem;
