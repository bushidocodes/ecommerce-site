import React from 'react';
import { expect } from 'chai';
import { render, cleanup } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Cart from './Cart';

afterEach(cleanup);

describe('<Cart/>', () => {
  it('shows 0 items and $0.00 when cart is empty', () => {
    const { container } = render(
      <MemoryRouter>
        <Cart cart={[]} />
      </MemoryRouter>
    );
    expect(container.innerHTML).to.contain('0');
    expect(container.innerHTML).to.contain('$0.00');
  });

  it('shows correct item count and total for one item', () => {
    const cart = [
      {
        product: {
          id: 1,
          name: 'Chocolate Chip',
          price: 1.5,
          photo: '',
          description: '',
          categories: [],
        },
        quantity: 2,
      },
    ];
    const { container } = render(
      <MemoryRouter>
        <Cart cart={cart} />
      </MemoryRouter>
    );
    expect(container.innerHTML).to.contain('2');
    expect(container.innerHTML).to.contain('$3.00');
  });

  it('accumulates totals across multiple items', () => {
    const cart = [
      {
        product: {
          id: 1,
          name: 'Chocolate Chip',
          price: 1.5,
          photo: '',
          description: '',
          categories: [],
        },
        quantity: 2,
      },
      {
        product: {
          id: 2,
          name: 'Oatmeal Raisin',
          price: 2.0,
          photo: '',
          description: '',
          categories: [],
        },
        quantity: 1,
      },
    ];
    const { container } = render(
      <MemoryRouter>
        <Cart cart={cart} />
      </MemoryRouter>
    );
    // 2 + 1 = 3 items, 2*1.5 + 1*2.0 = $5.00
    expect(container.innerHTML).to.contain('3');
    expect(container.innerHTML).to.contain('$5.00');
  });
});
