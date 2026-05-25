import React, { Component } from 'react'
import { connect } from 'react-redux'
import Nav from '../components/Nav'
import { selectUser } from '../reducers/users'
import { logout } from '../reducers/auth'
import { browserHistory } from 'react-router'

function mapStateToProps(state) {
  return {
    auth: state.auth,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    logout: () => {
      dispatch(logout())
      browserHistory.push('/')
    },
    selectUser: user => {
      dispatch(selectUser(user))
      browserHistory.push('/user')
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Nav)
