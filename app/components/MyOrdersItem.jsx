'use strict'

import React from 'react'
import { Link } from 'react-router'

export default props => {
  return (
    <div className="panel panel-success">
      <div className="panel-heading">
        {/* Link to order detail */}
        <Link onClick={evt => props.selectOrder(props.order)} to="/order">
          <h3 className="panel-title">Order ID: {props.order.id}</h3>
        </Link>
      </div>
      <div className="panel-body">
        <div className="media">
          <div className="media-body">
            {/* Shipping information */}
            <p>Order created {props.order.created_at}</p>
            <p>
              Shipped by{' '}
              {props.order.shippingCarrier || 'Omri in a beige Dodge Van'} on
              January 15, 2017
            </p>
            {/* Order total */}
            <p>Total: ${props.order.total}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
