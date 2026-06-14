import { exec } from 'child_process';
import { promisify } from 'util';
import chalk from 'chalk';
import db, { dbName, dbUrl } from './sequelize.js';
import app from '../index.js';

import './models/index.js';

const execAsync = promisify(exec);

async function sync(force = app.isTesting, retries = 0, maxRetries = 5) {
  try {
    await db.sync({ force });
    console.log(`Synced models to db ${dbUrl}`);
  } catch (fail) {
    if (app.isProduction || retries > maxRetries) {
      console.error(chalk.red(`********** database error ***********`));
      console.error(chalk.red(`    Couldn't connect to ${dbUrl}`));
      console.error();
      console.error(chalk.red(fail));
      console.error(chalk.red(`*************************************`));
      return;
    }
    console.log(
      `${retries ? `[retry ${retries}]` : ''} Creating database ${dbName}...`
    );
    await execAsync(`createdb "${dbName}"`);
    await sync(true, retries + 1);
  }
}

db.didSync = sync();

export default db;
