import createDebug from 'debug';
import { DataTypes, Model } from 'sequelize';
import type {
  BelongsToGetAssociationMixin,
  BelongsToSetAssociationMixin,
  ModelStatic,
} from 'sequelize';
import type { Profile, Strategy } from 'passport';
import db from '../sequelize.js';
import User from './user.js';
import type { UserInstance } from './user.js';

const debug = createDebug('oauth');

type OAuthVerify = (
  accessToken: string,
  refreshToken: string,
  profile: Profile,
  done: (err: unknown, user?: UserInstance) => void
) => Promise<void>;

interface SetupStrategyArgs {
  provider: string;
  strategy: new (...args: any[]) => Strategy;
  config: Record<string, unknown>;
  oauth?: OAuthVerify;
  passport: { use(strategy: Strategy): unknown };
}

export interface OAuthInstance extends Model {
  uid: string;
  provider: string;
  accessToken: string | null;
  refreshToken: string | null;
  token: string | null;
  tokenSecret: string | null;
  profileJson: unknown;

  getUser: BelongsToGetAssociationMixin<UserInstance>;
  setUser: BelongsToSetAssociationMixin<UserInstance, number>;
}

interface OAuthStatic extends ModelStatic<OAuthInstance> {
  V2: OAuthVerify;
  setupStrategy: (args: SetupStrategyArgs) => void;
}

const OAuth = db.define<OAuthInstance>(
  'oauths',
  {
    uid: DataTypes.STRING,
    provider: DataTypes.STRING,

    accessToken: DataTypes.STRING,
    refreshToken: DataTypes.STRING,

    token: DataTypes.STRING,
    tokenSecret: DataTypes.STRING,

    profileJson: DataTypes.JSON,
  },
  {
    indexes: [{ fields: ['uid'], unique: true }],
  }
) as OAuthStatic;

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
