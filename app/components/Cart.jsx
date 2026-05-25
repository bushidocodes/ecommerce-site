'use strict'

import React, { Component } from 'react'
import Cart from './Cart'
import { Link } from 'react-router-dom'

export default props => {
  let numOfItems = 0
  let total = 0
  props.cart.forEach(cartLineItem => {
    numOfItems += cartLineItem.quantity
    total += cartLineItem.product.price * cartLineItem.quantity
  })
  return (
    <div className="float-end">
      <p id="cartPreviewText">
        <i id="cartPreviewIcon" className="fa fa-shopping-cart"></i>
        <span> {numOfItems}</span> items totaling{' '}
        <span>${total.toFixed(2)} </span>
        {window.location.pathname === '/viewcart' ? (
          <Link className="btn btn-warning btn-sm" to="/products">
            Buy more
          </Link>
        ) : (
          <Link className="btn btn-success btn-sm" to="/viewcart">
            View Cart
          </Link>
        )}
      </p>
    </div>
  )
}
