import { styleText } from 'util';
import createDebug from 'debug';
import Sequelize from 'sequelize';
import app from '../index.js';

const debug = createDebug('sql');

export const dbName =
  (process.env.DATABASE_NAME || app.name) + (app.isTesting ? '_test' : '');
export const dbUrl =
  process.env.DATABASE_URL || `postgres://localhost:5432/${dbName}`;

console.log(styleText('yellow', `Opening database connection to ${dbUrl}`));

const db = new Sequelize(dbUrl, {
  logging: debug,
  native: false,
  define: {
    underscored: true,
    freezeTableName: true,
    timestamps: true,
  },
});

export default db;
