// @vitest-environment jsdom
import React from 'react';
import { expect } from 'chai';
import { render, cleanup } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Products from './Products';
import rootReducer from '../reducers';

afterEach(cleanup);

function makeTestStore() {
  return configureStore({ reducer: rootReducer });
}

describe('<Products/>', () => {
  const noop = () => {};
  const sampleProducts = [
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
    const { container } = render(
      <Provider store={makeTestStore()}>
        <MemoryRouter>
          <Products products={sampleProducts} plusItemzToCart={noop} />
        </MemoryRouter>
      </Provider>
    );
    expect(container.innerHTML).to.contain('Chocolate Chip');
    expect(container.innerHTML).to.contain('Oatmeal Raisin');
    expect(container.innerHTML).to.contain('Sugar Cookie');
  });

  it('renders nothing for an empty product list', () => {
    const { container } = render(
      <Provider store={makeTestStore()}>
        <MemoryRouter>
          <Products products={[]} plusItemzToCart={noop} />
        </MemoryRouter>
      </Provider>
    );
    expect(container.innerHTML).to.not.contain('Add to cart');
  });

  it('shows category tags for each product', () => {
    const { container } = render(
      <Provider store={makeTestStore()}>
        <MemoryRouter>
          <Products products={sampleProducts} plusItemzToCart={noop} />
        </MemoryRouter>
      </Provider>
    );
    expect(container.innerHTML).to.contain('chocolate');
    expect(container.innerHTML).to.contain('oatmeal');
  });
});
