import bcrypt from 'bcrypt';
import Sequelize from 'sequelize';
import db from '../sequelize.js';

const User = db.define(
  'users',
  {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      validate: {
        isEmail: true,
        notEmpty: true,
      },
    },
    billingAddress: Sequelize.STRING,
    billingCity: Sequelize.STRING,
    billingState: Sequelize.STRING,
    billingZip: {
      type: Sequelize.STRING,
      validate: { is: /^\d{5}(-\d{4})?$/ },
    },

    shippingAddress: Sequelize.STRING,
    shippingCity: Sequelize.STRING,
    shippingState: Sequelize.STRING,
    shippingZip: {
      type: Sequelize.STRING,
      validate: { is: /^\d{5}(-\d{4})?$/ },
    },

    password_digest: Sequelize.STRING,
    password: Sequelize.VIRTUAL,
    resetPassword: Sequelize.BOOLEAN,

    isAdmin: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    role: {
      type: Sequelize.ENUM('unauth', 'auth'),
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

User.prototype.toJSON = function () {
  const values = Object.assign({}, this.dataValues);
  delete values.password_digest;
  return values;
};

User.prototype.authenticate = function (plaintext) {
  return new Promise((resolve, reject) =>
    bcrypt.compare(plaintext, this.password_digest, (err, result) =>
      err ? reject(err) : resolve(result)
    )
  );
};

function setEmailAndPassword(user) {
  user.email = user.email && user.email.toLowerCase();
  if (!user.password) return Promise.resolve(user);

  return new Promise((resolve, reject) =>
    bcrypt.hash(user.get('password'), 10, (err, hash) => {
      if (err) reject(err);
      user.set('password_digest', hash);
      resolve(user);
    })
  );
}

export default User;
