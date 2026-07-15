import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { getJSON } from '../api';
import NavContainer from '../containers/NavContainer';
import { receiveProducts } from '../reducers/products';
import type { AppDispatch } from '../store';
import type { Product } from '../types';
import Footer from './Footer';

export default function App() {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    getJSON<Product[]>('/api/products')
      .then(products => dispatch(receiveProducts(products)))
      .catch(err => console.error(err));
  }, []);
  return (
    <div id="main" className="container-fluid">
      <NavContainer />
      <Outlet />
      <Footer />
    </div>
  );
}
