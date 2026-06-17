import { DataTypes, Model } from 'sequelize';
import type { Optional } from 'sequelize';
import db from '../sequelize.js';

export interface ReviewAttributes {
  id: number;
  title: string;
  body: string | null;
  rating: number;
  photo: string | null;
  productId: number | null;
  userId: number | null;
}

type ReviewCreationAttributes = Optional<
  ReviewAttributes,
  'id' | 'body' | 'photo' | 'productId' | 'userId'
>;

export interface ReviewInstance
  extends Model<ReviewAttributes, ReviewCreationAttributes>,
    ReviewAttributes {}

const Review = db.define<
  ReviewInstance,
  Omit<ReviewAttributes, 'id' | 'productId' | 'userId'>
>(
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
