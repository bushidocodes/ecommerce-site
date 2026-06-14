import { resolve } from 'path';
import { homedir } from 'os';
import { createRequire } from 'module';
import createDebug from 'debug';

const require = createRequire(import.meta.url);
const pkg = require('./package.json');
const debug = createDebug(`${pkg.name}:boot`);

// Load a secrets file from ~/.cookie-monsters.env.js or .env.json
// and merge it into the environment.
const env = Object.create(process.env);
const secretsFile = resolve(homedir(), `.${pkg.name}.env`);
try {
  Object.assign(env, require(secretsFile));
} catch (error) {
  debug('%s: %s', secretsFile, error.message);
  debug('%s: env file not found or invalid, moving on', secretsFile);
}

export default {
  get name() {
    return pkg.name;
  },
  get isTesting() {
    return !!global.it;
  },
  get isProduction() {
    return process.env.NODE_ENV === 'production';
  },
  get baseUrl() {
    return env.BASE_URL || `http://localhost:${this.port}`;
  },
  get port() {
    return env.PORT || 1337;
  },
  package: pkg,
  env,
};
