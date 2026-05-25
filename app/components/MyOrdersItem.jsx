'use strict'

import React from 'react'
import { Link } from 'react-router-dom'

export default props => {
  return (
    <div className="card border-success mb-3">
      <div className="card-header">
        <Link onClick={evt => props.selectOrder(props.order)} to="/order">
          <h3 className="card-title">Order ID: {props.order.id}</h3>
        </Link>
      </div>
      <div className="card-body">
        <p>Order created {props.order.created_at}</p>
        <p>
          Shipped by{' '}
          {props.order.shippingCarrier || 'Omri in a beige Dodge Van'} on
          January 15, 2017
        </p>
        <p>Total: ${props.order.total}</p>
      </div>
    </div>
  )
}
