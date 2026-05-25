import React, { Component } from 'react'
import { connect } from 'react-redux'
import App from '../components/App'

function mapStateToProps(state) {
  return {
    products: state.products,
  }
}

export default connect(mapStateToProps)(App)
