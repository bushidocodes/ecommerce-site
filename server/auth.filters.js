const mustBeLoggedIn = (req, res, next) => {
  if (!req.user) {
    return res.status(401).send('You must be logged in');
  }
  next();
};

const selfOnly = action => (req, res, next) => {
  if (req.params.id !== req.user.id) {
    return res.status(403).send(`You can only ${action} yourself.`);
  }
  next();
};

const forbidden = (res, message) => {
  return res.status(403).send(message);
};

// const selfOnlyOrAdmin = action => (req, res, next) => {
//   if (!req.user.isAdmin && req.params.id !== req.user.id) {
//     return res.status(403).send(`You can only ${action} yourself.`)
//   }
//   next()
// }

module.exports = { mustBeLoggedIn, selfOnly, forbidden };
