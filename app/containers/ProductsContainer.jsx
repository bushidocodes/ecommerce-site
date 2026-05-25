import React, { Component } from 'react'
import { connect } from 'react-redux'
import Products from '../components/Products'
import { addToCart } from '../reducers/cart'

function mapStateToProps(state) {
  return {
    products: state.products,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    plusItemzToCart: (product, quantity) => {
      dispatch(addToCart(product, quantity))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Products)
