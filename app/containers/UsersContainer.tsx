import React, { useEffect } from 'react'
import { connect, useDispatch } from 'react-redux'
import Users from '../components/Users'
import { selectUser, receiveUsers } from '../reducers/users'
import withNavigate, { WithNavigateProps } from '../utils/withNavigate'
import type { RootState, AppDispatch } from '../store'
import type { User } from '../types'

function mapStateToProps(state: RootState) {
  return {
    users: state.users,
    auth: state.auth,
  }
}

function mapDispatchToProps(dispatch: AppDispatch, ownProps: WithNavigateProps) {
  return {
    selectUser: (user: Partial<User>) => {
      dispatch(selectUser(user))
      ownProps.navigate('/user')
    },
  }
}

function UsersPage(props: ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>) {
  const dispatch = useDispatch<AppDispatch>()
  useEffect(() => {
    dispatch(receiveUsers())
  }, [dispatch])
  return <Users {...props} />
}

export default withNavigate(connect(mapStateToProps, mapDispatchToProps)(UsersPage))
