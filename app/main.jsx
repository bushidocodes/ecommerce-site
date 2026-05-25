'use strict'
import React from 'react'
import { Router, Route, IndexRedirect, browserHistory } from 'react-router'
import { render } from 'react-dom'
import { connect, Provider } from 'react-redux'
import axios from 'axios'
import { receiveProducts } from './reducers/products'
// TODO: Make sure that this func acts similarly to receiveProducts
import { receiveUsers } from './reducers/users'
import { receiveOrders } from './reducers/orders'
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

/* Commenting out example app because we can mimic its functionality, perhaps in the Navbar component
   Also: referencing Auther workshop for basic 'root' react component heirarchy (not for code style, but for structure)


const ExampleApp = connect(
  ({ auth }) => ({ user: auth })
) (
  ({ user, children }) =>
    <div>
      <nav>
        <Signup/>
        {user ? <WhoAmI/> : <Login/>}
      </nav>
      {children}
    </div>
);
*/

const onAppEnter = function () {
  axios.get('/api/products').then(products => {
    store.dispatch(receiveProducts(products.data))
  })
}

const onUsersEnter = function () {
  //if user is an admin
  store.dispatch(receiveUsers())
}

const onOrdersEnter = function () {
  store.dispatch(receiveOrders())
}

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={AppContainer} onEnter={onAppEnter}>
        <Route path="/products" component={ProductsContainer} />
        <Route path="/viewcart" component={CartViewContainer} />
        <Route path="/order" component={Order} />
        <Route path="/reviews" component={Reviews} />
        <Route path="/signup" component={SignUp} />
        <Route path="/login" component={LoginContainer} />
        <Route
          path="/users"
          component={UsersContainer}
          onEnter={onUsersEnter}
        />
        <Route path="/user" component={UserContainer} />
        <Route path="/myorders" component={MyOrders} onEnter={onOrdersEnter} />
        <IndexRedirect to="/products" />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('main')
)
