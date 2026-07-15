import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Reviews from './components/Reviews';
import SignUp from './components/SignUp';
import AppContainer from './containers/AppContainer';
import CartViewContainer from './containers/CartViewContainer';
import LoginContainer from './containers/LoginContainer';
import MyOrders from './containers/MyOrdersContainer';
import Order from './containers/OrderContainer';
import ProductsContainer from './containers/ProductsContainer';
import UserContainer from './containers/UserContainer';
import UsersContainer from './containers/UsersContainer';
import store from './store';

const rootEl = document.getElementById('main');
if (!rootEl) throw new Error('Root element #main not found');

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
);
