import { DataTypes, Model } from 'sequelize';
import type {
  BelongsToManyAddAssociationMixin,
  BelongsToManyGetAssociationsMixin,
  BelongsToManyRemoveAssociationMixin,
} from 'sequelize';
import db from '../sequelize.js';
import type { ProductInstance } from './product.js';

export interface OrderInstance extends Model {
  id: number;
  status: 'created' | 'processing' | 'cancelled' | 'completed';
  shippingRate: string;
  shippingCarrier: 'USPS' | 'UPS' | 'FedEx' | null;
  trackingNumber: string | null;
  userId: number | null;
  created_at?: Date;

  // Eager-loaded association + computed async getter (see getterMethods below).
  products?: ProductInstance[];
  readonly total: Promise<number>;

  getProducts: BelongsToManyGetAssociationsMixin<ProductInstance>;
  addProduct: BelongsToManyAddAssociationMixin<ProductInstance, number>;
  removeProduct: BelongsToManyRemoveAssociationMixin<ProductInstance, number>;
}

const Order = db.define<OrderInstance>(
  'orders',
  {
    status: {
      type: DataTypes.ENUM('created', 'processing', 'cancelled', 'completed'),
      defaultValue: 'created',
      allowNull: false,
    },
    shippingRate: {
      type: DataTypes.DECIMAL(16, 2),
      defaultValue: 3.95,
      validate: {
        notEmpty: true,
      },
    },
    shippingCarrier: {
      type: DataTypes.ENUM('USPS', 'UPS', 'FedEx'),
      allowNull: true,
    },
    trackingNumber: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    indexes: [{ fields: ['user_id'] }],
    getterMethods: {
      total(this: OrderInstance) {
        let runningTotal = 0.0;
        return this.getProducts().then(products => {
          products.forEach(
            product => (runningTotal += product.orderLineItems!.subtotal)
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
