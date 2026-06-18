import { exec } from 'child_process';
import { promisify, styleText } from 'util';
import db, { dbName, dbUrl } from './sequelize.js';
import app from '../index.js';

import './models/index.js';

const execAsync = promisify(exec);

// Postgres error code 3D000: "invalid_catalog_name" — database does not exist.
function isMissingDbError(err: unknown): boolean {
  return (err as any)?.original?.code === '3D000';
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
    await execAsync(`createdb "${dbName}"`);
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
