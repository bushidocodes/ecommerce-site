const db = require('../db');

const seedUsers = () =>
  Promise.all(
    [
      {
        name: 'Evan',
        email: 'evan@example.com',
        password: '1234',
        isAdmin: true,
      },
      {
        name: 'Sean',
        email: 'sean@example.com',
        password: '1234',
        isAdmin: true,
      },
      {
        name: 'Rachel',
        email: 'rachel@example.com',
        password: '1234',
        isAdmin: true,
      },
      {
        name: 'Test1',
        email: 'test1@example.com',
        password: '1234',
        isAdmin: false,
      },
    ].map(user => db.model('users').create(user))
  );

const seedProducts = () =>
  Promise.all(
    [
      {
        name: 'Chocolate Chip',
        description: 'The classic. Enjoy with a tall glass of cold milk.',
        price: '1.50',
        quantity: 250,
        photo: 'images/cookies/chocolate-chip.jpg',
        categories: ['chocolate', 'classic'],
      },
      {
        name: 'Chocolate Chip with Walnuts',
        description: 'Brain food. Healthy!',
        price: '1.50',
        quantity: 250,
        photo: 'images/cookies/chocolate-chip-walnut.jpg',
        categories: ['chocolate', 'nuts'],
      },
      {
        name: 'Oatmeal Raisin',
        description: 'Why would you order this? Really?',
        price: '1.50',
        quantity: 250,
        photo: 'images/cookies/oatmeal-raisin.jpg',
        categories: ['oatmeal', 'classic'],
      },
      {
        name: 'Oatmeal Chocolate Chip',
        description: 'This is an improvement on oatmeal raisin.',
        price: '1.50',
        quantity: 250,
        photo: 'images/cookies/oatmeal-choc-chip.jpg',
        categories: ['chocolate', 'classic', 'oatmeal'],
      },
      {
        name: 'Sugar Cookie with Frosting & Sprinkles',
        description: "It's festive and fun.",
        price: '1.50',
        quantity: 250,
        photo: 'images/cookies/sugar-cookie-frosting-sprinkles.jpg',
        categories: ['sugar', 'classic', 'holiday'],
      },
      {
        name: 'Snickerdoodle',
        description: 'Sugar cookies with cinnamon. Enjoy with high tea.',
        price: '1.50',
        quantity: 250,
        photo: 'images/cookies/snickerdoodle.jpg',
        categories: ['classic'],
      },
      {
        name: 'White Chocolate & Macadamia Nut',
        description: 'Maximum sweetness.',
        price: '1.50',
        quantity: 250,
        photo: 'images/cookies/white-choc-macadamia-nut.jpg',
        categories: ['white chocolate', 'nuts'],
      },
      {
        name: 'Gingerbread',
        description: 'Great all year round!',
        price: '1.50',
        quantity: 250,
        photo: 'images/cookies/gingerbread-man.jpg',
        categories: ['holiday', 'classic'],
      },
      {
        name: 'Salted Caramel Chocolate Chip Cookie',
        description: 'For the hipsters out there.',
        price: '1.50',
        quantity: 250,
        photo: 'images/cookies/salted-caramel-choc-chip.jpg',
        categories: ['hipster', 'caramel', 'chocolate'],
      },
      {
        name: 'Black & White Cookie',
        description: 'The race relations cookie made famous by Jerry Seinfeld.',
        price: '1.50',
        quantity: 250,
        photo: 'images/cookies/black-white.jpg',
        categories: ['classic'],
      },
      {
        name: 'Peanut Butter Cookie',
        description: 'Keeps you satisfied.',
        price: '1.50',
        quantity: 250,
        photo: 'images/cookies/peanut-butter.jpg',
        categories: ['classic', 'nut'],
      },
      {
        name: 'Lemon Raspberry Cookie',
        description: 'Made by award-winning baker Erica McBride.',
        price: '1.50',
        quantity: 250,
        photo: 'images/cookies/lemon-raspberry.jpg',
        categories: ['classic', 'regal', 'award-winning'],
      },
    ].map(product => db.model('products').create(product))
  );

const seedReviews = () =>
  Promise.all(
    [
      {
        title: 'Gross!',
        body: 'Will never order these again. Disgusting. Ruined the party.',
        rating: 1,
        user_id: 3,
        product_id: 4,
      },
      {
        title: 'Delicious!',
        body: 'Will order these constantly. Getting fat.',
        rating: 5,
        user_id: 3,
        product_id: 1,
      },
      {
        title: 'Meh',
        body: 'Not the worst.',
        rating: 3,
        user_id: 3,
        product_id: 9,
      },
    ].map(review => db.model('reviews').create(review))
  );

db.didSync
  .then(() => db.sync({ force: true }))
  .then(seedUsers)
  .then(users => console.log(`Seeded ${users.length} users OK`))
  .then(seedProducts)
  .then(products => console.log(`Seeded ${products.length} products OK`))
  .then(seedReviews)
  .then(reviews => console.log(`Seeded ${reviews.length} reviews OK`))
  .catch(error => console.error(error))
  .finally(() => db.close());
