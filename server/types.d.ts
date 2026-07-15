import type { ProductInstance } from '../db/models/product.js';
import type { UserInstance } from '../db/models/user.js';

// Augment Express so `req.user` is our Sequelize User instance (set by Passport)
// and the per-route lookups attached in middleware are typed.
declare global {
  namespace Express {
    interface User extends UserInstance {}

    interface Request {
      foundUser?: UserInstance;
      product?: ProductInstance;
    }
  }
}
