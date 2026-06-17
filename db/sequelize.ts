import { styleText } from 'util';
import createDebug from 'debug';
import { Sequelize } from 'sequelize';
import app from '../index.js';

const debug = createDebug('sql');

export const dbName =
  (process.env.DATABASE_NAME || app.name) + (app.isTesting ? '_test' : '');
export const dbUrl =
  process.env.DATABASE_URL || `postgres://localhost:5432/${dbName}`;

// The TypeScript test runner (tsx) can evaluate this module under more than one
// resolved specifier — e.g. when a model is reached both via `./sequelize.js`
// and `../sequelize.js` from importers in different directories. That would
// otherwise create multiple Sequelize instances that race to sync the same
// database. Cache a single instance on globalThis so every importer shares it.
const globalForDb = globalThis as unknown as { __sequelize?: Sequelize };

function createDb(): Sequelize {
  console.log(styleText('yellow', `Opening database connection to ${dbUrl}`));
  return new Sequelize(dbUrl, {
    logging: debug,
    native: false,
    define: {
      underscored: true,
      freezeTableName: true,
      timestamps: true,
    },
  });
}

const db = (globalForDb.__sequelize ??= createDb());

// `db.didSync` is assigned in db/index.ts and awaited throughout the app/tests.
declare module 'sequelize' {
  interface Sequelize {
    didSync: Promise<void>;
  }
}

export default db;
