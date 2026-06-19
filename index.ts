import { readFileSync } from 'fs';
import { resolve } from 'path';
import { homedir } from 'os';
import createDebug from 'debug';
import pkg from './package.json' with { type: 'json' };

const debug = createDebug(`${pkg.name}:boot`);

// Load a secrets file from ~/.cookie-monsters.env.json and merge into env.
const env = Object.create(process.env);
const secretsFile = resolve(homedir(), `.${pkg.name}.env.json`);
try {
  Object.assign(env, JSON.parse(readFileSync(secretsFile, 'utf-8')));
} catch (error) {
  debug('%s: %s', secretsFile, error instanceof Error ? error.message : error);
  debug('%s: env file not found or invalid, moving on', secretsFile);
}

export default {
  get name() {
    return pkg.name;
  },
  get isTesting() {
    return !!process.env.VITEST;
  },
  get isProduction() {
    return process.env.NODE_ENV === 'production';
  },
  get baseUrl() {
    return env.BASE_URL ?? `http://localhost:${this.port}`;
  },
  get port() {
    return env.PORT ?? 1337;
  },
  package: pkg,
  env,
};
