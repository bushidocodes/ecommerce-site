import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import Products from './Products';
import rootReducer from '../reducers';

// Minimal store for component tests — no middleware, no side effects
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
    const root = shallow(
      <Provider store={makeTestStore()}>
        <MemoryRouter>
          <Products products={sampleProducts} plusItemzToCart={noop} />
        </MemoryRouter>
      </Provider>
    );
    expect(root.html()).to.contain('Chocolate Chip');
    expect(root.html()).to.contain('Oatmeal Raisin');
    expect(root.html()).to.contain('Sugar Cookie');
  });

  it('renders nothing for an empty product list', () => {
    const root = shallow(
      <Provider store={makeTestStore()}>
        <MemoryRouter>
          <Products products={[]} plusItemzToCart={noop} />
        </MemoryRouter>
      </Provider>
    );
    expect(root.html()).to.not.contain('Add to cart');
  });

  it('shows category tags for each product', () => {
    const root = shallow(
      <Provider store={makeTestStore()}>
        <MemoryRouter>
          <Products products={sampleProducts} plusItemzToCart={noop} />
        </MemoryRouter>
      </Provider>
    );
    expect(root.html()).to.contain('chocolate');
    expect(root.html()).to.contain('oatmeal');
  });
});
