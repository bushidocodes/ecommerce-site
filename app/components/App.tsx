import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { getJSON } from '../api';
import { receiveProducts } from '../reducers/products';
import Footer from './Footer';
import NavContainer from '../containers/NavContainer';
import type { AppDispatch } from '../store';
import type { Product } from '../types';

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
