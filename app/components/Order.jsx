'use strict'

import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default props => {
  return (
    <div className="container">
      <div>
        <img className="cookieMonsterImg" src="/images/cookie-monster.jpg" />
        <h1>Cookie Monsters</h1>
        <h3 className="subtitle">Home of the world's greatest cookies</h3>
      </div>
      <div id="orderDetail">
        <p className="lead">Cookie Order {props.order.id}</p>
        <table className="table table-responsive table-borderless">
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
              <td className="pull-right orderTableFooterTitles">
                Flat Shipping Rate
              </td>
              <td>${props.order.shippingRate}</td>
            </tr>
            <tr>
              <td></td>
              <td className="pull-right orderTableFooterTitles">Total</td>
              <td>${props.order.total}</td>
            </tr>
            <tr>
              <td></td>
              <td></td>
            </tr>
          </tfoot>
          <tbody>
            {/* Need to make a loop for table rows */}
            {props.order.products.map(product => (
              <tr key={product.id}>
                <td>{product.orderLineItems.quantity}</td>
                <td>{product.name}</td>
                <td>$ {product.orderLineItems.subtotal}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* This should appear after order is submitted */}
        <div className="lead">
          Cookies shipped by{' '}
          <span id="shippingCarrier">{props.order.shippingCarrier}</span>.
        </div>
      </div>
    </div>
  )
}
