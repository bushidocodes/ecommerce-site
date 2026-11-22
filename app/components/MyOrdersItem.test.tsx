// @vitest-environment jsdom

import { cleanup, render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import type { Order } from '../types';
import MyOrdersItem, { shippingLabel } from './MyOrdersItem';

afterEach(cleanup);

function order(overrides: Partial<Order> = {}): Order {
  return {
    id: 1,
    status: 'created',
    shippingCarrier: 'UPS',
    total: 5.45,
    created_at: '2026-11-22T20:54:17.522-05:00',
    products: [],
    ...overrides,
  };
}

function renderItem(overrides: Partial<Order> = {}) {
  return render(
    <MemoryRouter>
      <MyOrdersItem order={order(overrides)} selectOrder={() => {}} />
    </MemoryRouter>
  );
}

describe('shippingLabel', () => {
  it('says Not yet shipped for created and processing orders', () => {
    expect(shippingLabel({ status: 'created', shippingCarrier: 'UPS' })).toBe(
      'Not yet shipped'
    );
    expect(
      shippingLabel({ status: 'processing', shippingCarrier: 'FedEx' })
    ).toBe('Not yet shipped');
  });

  it('says Not yet shipped when status is missing (no shippedAt field)', () => {
    expect(shippingLabel({ shippingCarrier: 'USPS' })).toBe('Not yet shipped');
  });

  it('names the carrier for completed orders without inventing a ship date', () => {
    expect(shippingLabel({ status: 'completed', shippingCarrier: 'UPS' })).toBe(
      'Shipped by UPS'
    );
  });

  it('reports cancelled orders', () => {
    expect(shippingLabel({ status: 'cancelled', shippingCarrier: 'UPS' })).toBe(
      'Order cancelled'
    );
  });
});

describe('<MyOrdersItem/>', () => {
  it('does not show the leftover hardcoded January 15, 2017 ship date', () => {
    const { container } = renderItem({ status: 'created' });
    expect(container).toHaveTextContent('Not yet shipped');
    expect(container).not.toHaveTextContent('January 15, 2017');
  });

  it('shows Shipped by the carrier for completed orders, still without a fake date', () => {
    const { container } = renderItem({ status: 'completed' });
    expect(container).toHaveTextContent('Shipped by UPS');
    expect(container).not.toHaveTextContent('January 15, 2017');
  });
});
