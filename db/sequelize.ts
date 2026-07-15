import createDebug from 'debug';
import { Sequelize } from 'sequelize';
import { styleText } from 'util';
import app from '../index.js';

const debug = createDebug('sql');

// Under test, give each Vitest worker its own database so parallel test files
// never race on a shared schema (each worker runs db.sync({ force: true })).
// VITEST_POOL_ID is a stable per-worker index that Vitest sets in the worker's
// env; it's absent outside the test runner.
const testSuffix = app.isTesting
  ? '_test' +
    (process.env.VITEST_POOL_ID ? `_${process.env.VITEST_POOL_ID}` : '')
  : '';

export const dbName = (process.env.DATABASE_NAME || app.name) + testSuffix;

// Derive the connection URL. When DATABASE_URL is provided (e.g. in CI) we keep
// its host/credentials but swap in the per-worker database name so isolation
// still applies. Otherwise fall back to a local default.
export const dbUrl = buildDbUrl();

function buildDbUrl(): string {
  if (!process.env.DATABASE_URL) {
    return `postgres://localhost:5432/${dbName}`;
  }
  const url = new URL(process.env.DATABASE_URL);
  // Only override the database name when we computed a per-worker suffix;
  // otherwise honor the URL exactly as given.
  if (testSuffix) {
    url.pathname = `/${dbName}`;
  }
  return url.toString();
}

// A maintenance URL pointing at the always-present `postgres` database on the
// same server, used to issue CREATE DATABASE when a per-worker test db is
// missing (see db/index.ts).
export const maintenanceUrl = (() => {
  const url = new URL(dbUrl);
  url.pathname = '/postgres';
  return url.toString();
})();

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
