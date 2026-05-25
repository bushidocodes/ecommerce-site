import React, { Component } from 'react'
import { connect } from 'react-redux'
import MyOrders from '../components/MyOrders'
import { selectOrder } from '../reducers/orders'

function mapStateToProps(state) {
  return {
    orders: state.orders.orders,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    selectOrder: order => {
      dispatch(selectOrder(order))
      // browserHistory.push('/user');
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyOrders)
