import bcrypt from 'bcrypt';
import { DataTypes, Model } from 'sequelize';
import type {
  HasManyCreateAssociationMixin,
  HasManyGetAssociationsMixin,
} from 'sequelize';
import db from '../sequelize.js';
import type { OrderInstance } from './order.js';

export interface UserInstance extends Model {
  id: number;
  name: string;
  email: string | null;
  billingAddress: string | null;
  billingCity: string | null;
  billingState: string | null;
  billingZip: string | null;
  shippingAddress: string | null;
  shippingCity: string | null;
  shippingState: string | null;
  shippingZip: string | null;
  password_digest: string | null;
  password: string | null;
  resetPassword: boolean | null;
  isAdmin: boolean;
  role: 'unauth' | 'auth';

  authenticate(plaintext: string): Promise<boolean>;

  getOrders: HasManyGetAssociationsMixin<OrderInstance>;
  createOrder: HasManyCreateAssociationMixin<OrderInstance>;
}

const User = db.define<UserInstance>(
  'users',
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true,
        notEmpty: true,
      },
    },
    billingAddress: DataTypes.STRING,
    billingCity: DataTypes.STRING,
    billingState: DataTypes.STRING,
    billingZip: {
      type: DataTypes.STRING,
      validate: { is: /^\d{5}(-\d{4})?$/ },
    },

    shippingAddress: DataTypes.STRING,
    shippingCity: DataTypes.STRING,
    shippingState: DataTypes.STRING,
    shippingZip: {
      type: DataTypes.STRING,
      validate: { is: /^\d{5}(-\d{4})?$/ },
    },

    password_digest: DataTypes.STRING,
    password: DataTypes.VIRTUAL,
    resetPassword: DataTypes.BOOLEAN,

    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM('unauth', 'auth'),
      defaultValue: 'unauth',
    },
  },
  {
    indexes: [{ fields: ['email'], unique: true }],
    hooks: {
      beforeCreate: setEmailAndPassword,
      beforeUpdate: setEmailAndPassword,
    },
  }
);

User.prototype.toJSON = function (this: UserInstance) {
  const values = { ...this.get() } as Record<string, unknown>;
  delete values.password_digest;
  return values;
};

// bcrypt v5+ returns a Promise when called without a callback
(User.prototype as UserInstance).authenticate = function (
  this: UserInstance,
  plaintext: string
) {
  return bcrypt.compare(plaintext, this.password_digest ?? '');
};

async function setEmailAndPassword(user: UserInstance): Promise<void> {
  if (user.email) user.email = user.email.toLowerCase();
  const password = user.password;
  if (!password) return;
  user.set('password_digest', await bcrypt.hash(password, 10));
}

export default User;
