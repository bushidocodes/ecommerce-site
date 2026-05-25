import { combineReducers } from '@reduxjs/toolkit'
import auth from './auth'
import products from './products'
import cart from './cart'
import users from './users'
import orders from './orders'

export default combineReducers({ auth, products, cart, users, orders })
