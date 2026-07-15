import { Sequelize } from 'sequelize';
import { styleText } from 'util';
import app from '../index.js';
import db, { dbName, dbUrl, maintenanceUrl } from './sequelize.js';

import './models/index.js';

// Postgres error code 3D000: "invalid_catalog_name" — database does not exist.
function isMissingDbError(err: unknown): boolean {
  return (err as any)?.original?.code === '3D000';
}

// Create the target database by connecting to the always-present `postgres`
// maintenance database on the same server. This works both locally and against
// a remote/CI Postgres (the `createdb` CLI would need local PG env vars and a
// matching socket, which CI doesn't provide).
async function createDatabase(): Promise<void> {
  const maintenance = new Sequelize(maintenanceUrl, { logging: false });
  try {
    // Database names can't be parameterized; dbName is derived from app config
    // and the worker id, not user input. Quote-escape defensively all the same.
    await maintenance.query(`CREATE DATABASE "${dbName.replace(/"/g, '""')}"`);
  } finally {
    await maintenance.close();
  }
}

async function sync(
  force = app.isTesting,
  retries = 0,
  maxRetries = 5
): Promise<void> {
  let syncError: unknown;
  try {
    await db.sync({ force });
    console.log(`Synced models to db ${dbUrl}`);
    return;
  } catch (fail) {
    syncError = fail;
  }

  if (app.isProduction || retries > maxRetries) {
    console.error(styleText('red', `********** database error ***********`));
    console.error(styleText('red', `    Couldn't connect to ${dbUrl}`));
    console.error();
    console.error(styleText('red', String(syncError)));
    console.error(styleText('red', `*************************************`));
    return;
  }

  if (!isMissingDbError(syncError)) {
    throw syncError;
  }

  console.log(
    `${retries ? `[retry ${retries}]` : ''} Creating database ${dbName}...`
  );
  try {
    await createDatabase();
  } catch {
    throw syncError;
  }
  await sync(true, retries + 1);
}

// Guard against the module being evaluated more than once (see sequelize.ts):
// only kick off a single sync on the shared instance.
if (!db.didSync) {
  const p = sync();
  p.catch(() => {}); // prevent unhandledRejection before consumers await db.didSync
  db.didSync = p;
}

export default db;
