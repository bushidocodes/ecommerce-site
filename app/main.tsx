import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'

import AppContainer from './containers/AppContainer'
import CartViewContainer from './containers/CartViewContainer'
import LoginContainer from './containers/LoginContainer'
import SignUp from './components/SignUp'
import Order from './containers/OrderContainer'
import MyOrders from './containers/MyOrdersContainer'
import ProductsContainer from './containers/ProductsContainer'
import UserContainer from './containers/UserContainer'
import UsersContainer from './containers/UsersContainer'
import Reviews from './components/Reviews'

const rootEl = document.getElementById('main')
if (!rootEl) throw new Error('Root element #main not found')

createRoot(rootEl).render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppContainer />}>
          <Route index element={<Navigate to="/products" replace />} />
          <Route path="products" element={<ProductsContainer />} />
          <Route path="cart" element={<Navigate to="/viewcart" replace />} />
          <Route path="viewcart" element={<CartViewContainer />} />
          <Route path="order" element={<Order />} />
          <Route path="reviews" element={<Reviews />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="login" element={<LoginContainer />} />
          <Route path="users" element={<UsersContainer />} />
          <Route path="user" element={<UserContainer />} />
          <Route path="myorders" element={<MyOrders />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </Provider>
)
