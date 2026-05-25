import React, { Component } from 'react'
import { connect } from 'react-redux'
import CartView from '../components/CartView'
import { submitOrder } from '../reducers/orders.jsx'

function mapStateToProps(state) {
  return {
    cart: state.cart,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    submitOrder: cart => {
      dispatch(submitOrder(cart))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CartView)
