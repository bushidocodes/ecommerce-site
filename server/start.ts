import cookieSession from 'cookie-session';
import express from 'express';
import { readFileSync } from 'fs';
import passport from 'passport';
import { resolve } from 'path';
import { fileURLToPath } from 'url';
import pkg from '../index.js';
import api from './api.js';

const __dirname = fileURLToPath(new URL('.', import.meta.url));
const distDir = resolve(__dirname, '..', 'dist');

// Read the built SPA shell once at startup instead of on every request. This
// keeps the catch-all route free of per-request file system access (avoids the
// DoS vector CodeQL flags as js/missing-rate-limiting) and serving the cached
// HTML string sidesteps Express 5's res.sendFile path handling, so client-side
// routes resolve on a hard load / refresh instead of 404ing.
let indexHtml = '';
try {
  indexHtml = readFileSync(resolve(distDir, 'index.html'), 'utf-8');
} catch {
  // dist/ isn't built yet (e.g. running the test suite before `vite build`).
  // API routes still work; the SPA fallback returns 503 until a build exists.
}

const app = express();

if (!pkg.isProduction && !pkg.isTesting) {
  const { default: morgan } = await import('morgan');
  app.use(morgan('dev'));
}

app
  .use(
    cookieSession({
      name: 'session',
      keys: [
        (() => {
          if (!process.env.SESSION_SECRET)
            throw new Error('SESSION_SECRET environment variable is required');
          return process.env.SESSION_SECRET;
        })(),
      ],
    })
  )
  .use(express.urlencoded({ extended: true }))
  .use(express.json())
  // Passport 0.6+ calls req.session.regenerate/save; cookie-session lacks these,
  // so we add no-op stubs.
  .use((req, _res, next) => {
    if (req.session && !req.session.regenerate) {
      req.session.regenerate = (cb: () => void) => cb();
    }
    if (req.session && !req.session.save) {
      req.session.save = (cb: () => void) => cb();
    }
    next();
  })
  .use(passport.initialize())
  .use(passport.session())
  .use(express.static(distDir))
  .use('/api', api)
  .get('/*path', (_req, res) => {
    if (!indexHtml) {
      return res.status(503).send('Client bundle not built. Run `pnpm build`.');
    }
    res.type('html').send(indexHtml);
  });

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const server = app.listen(Number(process.env.PORT ?? 1337), () => {
    console.log(`--- Started HTTP Server for ${pkg.name} ---`);
    console.log(`Listening on ${JSON.stringify(server.address())}`);
  });
}

export default app;
