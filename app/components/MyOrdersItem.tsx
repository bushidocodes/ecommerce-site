import React from 'react';
import { Link } from 'react-router-dom';
import type { Order } from '../types';

interface MyOrdersItemProps {
  order: Order;
  selectOrder: (order: Partial<Order>) => void;
}

export default function MyOrdersItem({
  order,
  selectOrder,
}: MyOrdersItemProps) {
  return (
    <div className="card border-success mb-3">
      <div className="card-header">
        <Link onClick={() => selectOrder(order)} to="/order">
          <h3 className="card-title">Order ID: {order.id}</h3>
        </Link>
      </div>
      <div className="card-body">
        <p>Order created {order.created_at}</p>
        <p>
          Shipped by {order.shippingCarrier || 'Omri in a beige Dodge Van'} on
          January 15, 2017
        </p>
        <p>Total: ${order.total}</p>
      </div>
    </div>
  );
}
