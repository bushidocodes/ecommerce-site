import { exec } from 'child_process';
import { promisify, styleText } from 'util';
import db, { dbName, dbUrl } from './sequelize.js';
import app from '../index.js';

import './models/index.js';

const execAsync = promisify(exec);

async function sync(
  force = app.isTesting,
  retries = 0,
  maxRetries = 5
): Promise<void> {
  try {
    await db.sync({ force });
    console.log(`Synced models to db ${dbUrl}`);
  } catch (fail) {
    if (app.isProduction || retries > maxRetries) {
      console.error(styleText('red', `********** database error ***********`));
      console.error(styleText('red', `    Couldn't connect to ${dbUrl}`));
      console.error();
      console.error(styleText('red', String(fail)));
      console.error(styleText('red', `*************************************`));
      return;
    }
    console.log(
      `${retries ? `[retry ${retries}]` : ''} Creating database ${dbName}...`
    );
    await execAsync(`createdb "${dbName}"`);
    await sync(true, retries + 1);
  }
}

// Guard against the module being evaluated more than once (see sequelize.ts):
// only kick off a single sync on the shared instance.
db.didSync ||= sync();

export default db;
