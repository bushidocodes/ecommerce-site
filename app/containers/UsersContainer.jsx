import React, { useEffect } from 'react'
import Users from '../components/Users.jsx'
import { connect, useDispatch } from 'react-redux'
import { selectUser, receiveUsers } from '../reducers/users'
import withNavigate from '../utils/withNavigate'

function mapStateToProps(state) {
  return {
    users: state.users,
    auth: state.auth,
  }
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    selectUser: user => {
      dispatch(selectUser(user))
      ownProps.navigate('/user')
    },
  }
}

function UsersPage(props) {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(receiveUsers())
  }, [dispatch])
  return <Users {...props} />
}

export default withNavigate(connect(mapStateToProps, mapDispatchToProps)(UsersPage))
