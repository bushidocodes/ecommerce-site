import type { Order as OrderType } from '../types';

interface OrderProps {
  order: Partial<OrderType>;
}

export default function Order({ order }: OrderProps) {
  return (
    <div className="container">
      <div>
        <img className="cookieMonsterImg" src="/images/cookie-monster.jpg" />
        <h1>Cookie Monsters</h1>
        <h3 className="subtitle">Home of the world&apos;s greatest cookies</h3>
      </div>
      <div id="orderDetail">
        <p className="lead">Cookie Order {order.id}</p>
        <div className="table-responsive">
          <table className="table table-borderless">
            <thead>
              <tr>
                <th>Quantity</th>
                <th>Cookie</th>
                <th>Totals</th>
              </tr>
            </thead>
            <tfoot>
              <tr>
                <td></td>
                <td className="float-end orderTableFooterTitles">
                  Flat Shipping Rate
                </td>
                <td>${order.shippingRate}</td>
              </tr>
              <tr>
                <td></td>
                <td className="float-end orderTableFooterTitles">Total</td>
                <td>${order.total}</td>
              </tr>
              <tr>
                <td></td>
                <td></td>
              </tr>
            </tfoot>
            <tbody>
              {order.products?.map(product => (
                <tr key={product.id}>
                  <td>{product.orderLineItems.quantity}</td>
                  <td>{product.name}</td>
                  <td>$ {product.orderLineItems.subtotal}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="lead">
          Cookies shipped by{' '}
          <span id="shippingCarrier">{order.shippingCarrier}</span>.
        </div>
      </div>
    </div>
  );
}
