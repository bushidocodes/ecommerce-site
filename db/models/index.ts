import User from './user.js';
import Product from './product.js';
import Order from './order.js';
import OrderLineItem from './orderLineItem.js';
import Review from './review.js';

Order.belongsToMany(Product, { through: OrderLineItem });
Product.belongsToMany(Order, { through: OrderLineItem });
Product.hasMany(Review);
User.hasMany(Review);
User.hasMany(Order);

export { User };
