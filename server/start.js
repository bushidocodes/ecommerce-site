import express from 'express';
import { resolve } from 'path';
import { fileURLToPath } from 'url';
import passport from 'passport';
import cookieSession from 'cookie-session';
import pkg from '../index.js';
import api from './api.js';

const __dirname = fileURLToPath(new URL('.', import.meta.url));

const app = express();

if (!pkg.isProduction && !pkg.isTesting) {
  const { default: volleyball } = await import('volleyball');
  app.use(volleyball);
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
      req.session.regenerate = cb => cb();
    }
    if (req.session && !req.session.save) {
      req.session.save = cb => cb();
    }
    next();
  })
  .use(passport.initialize())
  .use(passport.session())
  .use(express.static(resolve(__dirname, '..', 'public')))
  .use('/api', api)
  .get('/*', (_, res) =>
    res.sendFile(resolve(__dirname, '..', 'public', 'index.html'))
  );

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const server = app.listen(process.env.PORT ?? 1337, () => {
    console.log(`--- Started HTTP Server for ${pkg.name} ---`);
    console.log(`Listening on ${JSON.stringify(server.address())}`);
  });
}

export default app;
