import createDebug from 'debug';
import Sequelize from 'sequelize';
import db from '../sequelize.js';
import User from './user.js';

const debug = createDebug('oauth');

const OAuth = db.define(
  'oauths',
  {
    uid: Sequelize.STRING,
    provider: Sequelize.STRING,

    accessToken: Sequelize.STRING,
    refreshToken: Sequelize.STRING,

    token: Sequelize.STRING,
    tokenSecret: Sequelize.STRING,

    profileJson: Sequelize.JSON,
  },
  {
    indexes: [{ fields: ['uid'], unique: true }],
  }
);

OAuth.V2 = async (accessToken, refreshToken, profile, done) => {
  try {
    const [oauth] = await OAuth.findOrCreate({
      where: { provider: profile.provider, uid: profile.id },
    });
    debug(
      'provider:%s will log in user:{name=%s uid=%s}',
      profile.provider,
      profile.displayName,
      oauth.uid
    );
    oauth.profileJson = profile;
    // Run getUser and save in parallel; only the user result is needed downstream
    const [existingUser] = await Promise.all([oauth.getUser(), oauth.save()]);
    let user = existingUser;
    if (!user) {
      user = await User.create({ name: profile.displayName });
      await oauth.setUser(user);
    }
    done(null, user);
  } catch (err) {
    done(err);
  }
};

OAuth.setupStrategy = ({
  provider,
  strategy,
  config,
  oauth = OAuth.V2,
  passport,
}) => {
  const hasUndefined = Object.values(config).some(v => v === undefined);
  if (hasUndefined) {
    debug('provider:%s will not initialize', provider);
    return;
  }
  debug('initializing provider:%s', provider);
  passport.use(new strategy(config, oauth));
};

export default OAuth;
