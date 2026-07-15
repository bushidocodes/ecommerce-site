import { combineReducers } from '@reduxjs/toolkit';
import auth from './auth';
import cart from './cart';
import orders from './orders';
import products from './products';
import users from './users';

export default combineReducers({ auth, products, cart, users, orders });
