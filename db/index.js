import { exec } from 'child_process';
import chalk from 'chalk';
import db, { dbName, dbUrl } from './sequelize.js';
import app from '../index.js';

import './models/index.js';

function sync(force = app.isTesting, retries = 0, maxRetries = 5) {
  return db
    .sync({ force })
    .then(() => console.log(`Synced models to db ${dbUrl}`))
    .catch(fail => {
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
      return new Promise((resolve, reject) =>
        exec(`createdb "${dbName}"`, resolve)
      ).then(() => sync(true, retries + 1));
    });
}

db.didSync = sync();

export default db;
