import React from 'react';
import { Link } from 'react-router-dom';
import MyOrdersItem from './MyOrdersItem';
import type { Order } from '../types';

interface MyOrdersProps {
  orders: Order[];
  selectOrder: (order: Partial<Order>) => void;
}

export default function MyOrders({ orders, selectOrder }: MyOrdersProps) {
  return (
    <div className="container">
      <h1 className="display-4">My Orders</h1>
      {orders.length === 0 ? (
        <div className="container">
          <div
            id="no-orders"
            className="p-5 mb-4 bg-light rounded-3 text-center"
          >
            <div>
              <p>
                You haven&apos;t placed any orders yet. <br />
                Get some cookies!
              </p>
            </div>
            <div>
              <Link to="/products" className="btn btn-primary btn-lg">
                Go!
              </Link>
            </div>
          </div>
        </div>
      ) : (
        ''
      )}
      <div>
        {orders.map(order => (
          <MyOrdersItem
            key={order.id}
            order={order}
            selectOrder={selectOrder}
          />
        ))}
      </div>
    </div>
  );
}
