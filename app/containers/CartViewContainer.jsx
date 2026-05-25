import React from 'react'
import { connect } from 'react-redux'
import CartView from '../components/CartView'
import { submitOrder } from '../reducers/orders.jsx'
import withNavigate from '../utils/withNavigate'

function mapStateToProps(state) {
  return {
    cart: state.cart,
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    submitOrder: cart => {
      dispatch(submitOrder(cart, ownProps.navigate))
    },
  }
}

export default withNavigate(connect(mapStateToProps, mapDispatchToProps)(CartView))
