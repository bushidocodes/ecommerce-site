import React from 'react'
import { connect } from 'react-redux'
import Nav from '../components/Nav'
import { selectUser } from '../reducers/users'
import { logout } from '../reducers/auth'
import withNavigate from '../utils/withNavigate'

function mapStateToProps(state) {
  return {
    auth: state.auth,
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    logout: () => {
      dispatch(logout())
      ownProps.navigate('/')
    },
    selectUser: user => {
      dispatch(selectUser(user))
      ownProps.navigate('/user')
    },
  }
}

export default withNavigate(connect(mapStateToProps, mapDispatchToProps)(Nav))
