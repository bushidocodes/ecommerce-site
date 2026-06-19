import createDebug from 'debug';
import passport from 'passport';
import express from 'express';
import rateLimit from 'express-rate-limit';
import passportGithub from 'passport-github';
import passportLocal from 'passport-local';
import app from '../index.js';
import User from '../db/models/user.js';
import OAuth from '../db/models/oauth.js';

const { env } = app;
const debug = createDebug(`${app.name}:auth`);
const auth = express.Router();

// Throttle the credential endpoints (signup/login) to blunt brute-force and
// account-enumeration attempts. Generous enough not to affect normal use.
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

OAuth.setupStrategy({
  provider: 'github',
  strategy: passportGithub.Strategy,
  config: {
    clientID: env.GITHUB_CLIENT_ID,
    clientSecret: env.GITHUB_CLIENT_SECRET,
    callbackURL: `${app.baseUrl}/api/auth/login/github`,
  },
  passport,
});

passport.serializeUser((user, done) => {
  debug('will serialize user.id=%d', user.id);
  done(null, user.id);
  debug('did serialize user.id=%d', user.id);
});

passport.deserializeUser(async (id: number, done) => {
  debug('will deserialize user.id=%d', id);
  try {
    const user = await User.findByPk(id);
    debug('deserialize did ok user.id=%d', user?.id);
    done(null, user);
  } catch (err) {
    debug('deserialize did fail err=%s', err);
    done(err);
  }
});

passport.use(
  new passportLocal.Strategy(async (email, password, done) => {
    debug('will authenticate user(email: "%s")', email);
    try {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        debug('authenticate user(email: "%s") did fail: no such user', email);
        return done(null, false, { message: 'Login incorrect' });
      }
      const ok = await user.authenticate(password);
      if (!ok) {
        debug('authenticate user(email: "%s") did fail: bad password');
        return done(null, false, { message: 'Login incorrect' });
      }
      debug(
        'authenticate user(email: "%s") did ok: user.id=%d',
        email,
        user.id
      );
      done(null, user);
    } catch (err) {
      done(err);
    }
  })
);

auth.get('/whoami', (req, res) => res.send(req.user));

auth.post('/local/signup', authLimiter, async (req, res, next) => {
  if (req.user) return res.status(403).send('Already logged in');
  const { name, email, password } = req.body;
  try {
    const user = await User.create({ name, email, password });
    req.login(user, err => {
      if (err) return next(err);
      res.status(201).json(user);
    });
  } catch (err) {
    next(err);
  }
});

auth.post<{ strategy: string }>('/:strategy/login', authLimiter, (req, res, next) =>
  passport.authenticate(req.params.strategy, {
    successRedirect: '/',
  })(req, res, next)
);

auth.post('/logout', (req, res, next) => {
  req.logout(err => {
    if (err) return next(err);
    res.redirect('/api/auth/whoami');
  });
});

export default auth;
