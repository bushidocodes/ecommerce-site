import { createRequire } from 'module';

if (!process.env.SESSION_SECRET) {
  process.env.SESSION_SECRET = 'dev-preview-secret';
}

// Dynamic import ensures SESSION_SECRET is set before the server module loads.
// server/start.js exports the app but only calls listen() when run as main,
// so we call it ourselves here.
const { default: app } = await import('./server/start.js');

const require = createRequire(import.meta.url);
const pkg = require('./package.json');
const port = process.env.PORT || 1337;

const server = app.listen(port, () => {
  console.log(`--- Started HTTP Server for ${pkg.name} ---`);
  console.log(`Listening on ${JSON.stringify(server.address())}`);
});
