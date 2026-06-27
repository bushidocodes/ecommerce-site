// @vitest-environment jsdom
import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Cart from './Cart';
import type { CartItem } from '../types';

afterEach(cleanup);

function renderCart(cart: CartItem[]) {
  return render(
    <MemoryRouter>
      <Cart cart={cart} />
    </MemoryRouter>
  );
}

describe('<Cart/>', () => {
  it('shows 0 items and $0.00 when cart is empty', () => {
    const { container } = renderCart([]);
    expect(container).toHaveTextContent('0 items');
    expect(container).toHaveTextContent('$0.00');
  });

  it('shows correct item count and total for one item', () => {
    const cart: CartItem[] = [
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
    const { container } = renderCart(cart);
    expect(container).toHaveTextContent('2 items');
    expect(container).toHaveTextContent('$3.00');
  });

  it('accumulates totals across multiple items', () => {
    const cart: CartItem[] = [
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
    const { container } = renderCart(cart);
    // 2 + 1 = 3 items, 2*1.5 + 1*2.0 = $5.00
    expect(container).toHaveTextContent('3 items');
    expect(container).toHaveTextContent('$5.00');
  });
});
