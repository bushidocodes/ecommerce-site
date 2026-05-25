import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import MyOrdersItem from './MyOrdersItem'

export default props => {
  return (
    <div className="container">
      <h1 className="display-4">My Orders</h1>
      {/* Handle if no orders */}
      {props.orders.length === 0 ? (
        <div className="container">
          <div id="no-orders" className="jumbotron center">
            <div>
              <p>
                You haven't placed any orders yet. <br />
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
        {/* Loop over orders */}
        {/* Ideally would sort these with most recent order first */}
        {props.orders.map(order => (
          <MyOrdersItem
            key={order.id}
            order={order}
            selectOrder={props.selectOrder}
          />
        ))}
      </div>
    </div>
  )
}
