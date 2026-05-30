if (!process.env.SESSION_SECRET) {
  process.env.SESSION_SECRET = 'dev-preview-secret';
}

// server/start.js exports the Express app but only calls app.listen() when it is
// the main module. Since we're require()-ing it, we must call listen ourselves.
const app = require('./server/start.js');
const port = process.env.PORT || 1337;

const server = app.listen(port, () => {
  const pkg = require('./package.json');
  console.log(`--- Started HTTP Server for ${pkg.name} ---`);
  console.log(`Listening on ${JSON.stringify(server.address())}`);
});
