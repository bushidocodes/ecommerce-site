import { DataTypes, Model } from 'sequelize';
import db from '../sequelize.js';

export interface ReviewInstance extends Model {
  id: number;
  title: string;
  body: string | null;
  rating: number;
  photo: string | null;
  userId: number | null;
  productId: number | null;
}

const Review = db.define<ReviewInstance>(
  'reviews',
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    body: {
      type: DataTypes.TEXT,
    },
    rating: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
        min: 1,
        max: 5,
      },
    },
    photo: {
      type: DataTypes.STRING,
      validate: {
        isUrl: true,
      },
    },
  },
  {
    indexes: [{ fields: ['product_id'] }, { fields: ['user_id'] }],
  }
);

export default Review;
