import { Link } from 'react-router-dom';
import type { Order } from '../types';

interface MyOrdersItemProps {
  order: Order;
  selectOrder: (order: Partial<Order>) => void;
}

export function shippingLabel(
  order: Pick<Order, 'status' | 'shippingCarrier'>
): string {
  const carrier = order.shippingCarrier || 'Omri in a beige Dodge Van';
  if (order.status === 'cancelled') {
    return 'Order cancelled';
  }
  if (order.status === 'completed') {
    return `Shipped by ${carrier}`;
  }
  // There is no shippedAt column; new orders are created with status
  // "created" and never get a hardcoded date. Don't invent one.
  return 'Not yet shipped';
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
        <p>{shippingLabel(order)}</p>
        <p>Total: ${order.total}</p>
      </div>
    </div>
  );
}
