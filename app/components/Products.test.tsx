// @vitest-environment jsdom

import { configureStore } from '@reduxjs/toolkit';
import { cleanup, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import rootReducer from '../reducers';
import type { Product as ProductType } from '../types';
import Products from './Products';

afterEach(cleanup);

function makeTestStore() {
  return configureStore({ reducer: rootReducer });
}

function renderProducts(products: ProductType[]) {
  return render(
    <Provider store={makeTestStore()}>
      <MemoryRouter>
        <Products products={products} plusItemzToCart={() => {}} />
      </MemoryRouter>
    </Provider>
  );
}

describe('<Products/>', () => {
  const sampleProducts: ProductType[] = [
    {
      id: 1,
      name: 'Chocolate Chip',
      description: 'Classic',
      price: 1.5,
      photo: 'cc.jpg',
      categories: ['chocolate'],
    },
    {
      id: 2,
      name: 'Oatmeal Raisin',
      description: 'Why?',
      price: 1.25,
      photo: 'or.jpg',
      categories: ['oatmeal'],
    },
    {
      id: 3,
      name: 'Sugar Cookie',
      description: 'Sweet',
      price: 1.0,
      photo: 'sc.jpg',
      categories: ['classic'],
    },
  ];

  it('renders a card for each product', () => {
    renderProducts(sampleProducts);
    expect(
      screen.getByRole('heading', { name: 'Chocolate Chip' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Oatmeal Raisin' })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: 'Sugar Cookie' })
    ).toBeInTheDocument();
  });

  it('renders no add-to-cart buttons for an empty product list', () => {
    renderProducts([]);
    expect(
      screen.queryByRole('button', { name: /add to cart/i })
    ).not.toBeInTheDocument();
  });

  it('shows category tags for each product', () => {
    const { container } = renderProducts(sampleProducts);
    expect(container).toHaveTextContent('chocolate');
    expect(container).toHaveTextContent('oatmeal');
  });
});
