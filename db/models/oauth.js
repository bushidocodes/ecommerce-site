import createDebug from 'debug';
import Sequelize from 'sequelize';
import Promise from 'bluebird';
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

OAuth.V2 = (accessToken, refreshToken, profile, done) =>
  OAuth.findOrCreate({
    where: {
      provider: profile.provider,
      uid: profile.id,
    },
  })
    .then(([oauth]) => {
      debug(
        'provider:%s will log in user:{name=%s uid=%s}',
        profile.provider,
        profile.displayName,
        oauth.uid
      );
      oauth.profileJson = profile;
      return Promise.props({
        oauth,
        user: oauth.getUser(),
        _saveProfile: oauth.save(),
      });
    })
    .then(
      ({ oauth, user }) =>
        user ||
        User.create({
          name: profile.displayName,
        }).then(user =>
          Promise.props({
            user,
            _setOauthUser: oauth.setUser(user),
          })
        )
    )
    .then(({ user }) => done(null, user))
    .catch(done);

OAuth.setupStrategy = ({
  provider,
  strategy,
  config,
  oauth = OAuth.V2,
  passport,
}) => {
  const undefinedKeys = Object.keys(config)
    .map(k => config[k])
    .filter(value => typeof value === 'undefined');
  if (undefinedKeys.length) {
    undefinedKeys.forEach(key =>
      debug('provider:%s: needs environment var %s', provider, key)
    );
    debug('provider:%s will not initialize', provider);
    return;
  }

  debug('initializing provider:%s', provider);
  passport.use(new strategy(config, oauth));
};

export default OAuth;
