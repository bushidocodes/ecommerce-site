import Users from '../components/Users.jsx'
import { connect } from 'react-redux'
import { selectUser } from '../reducers/users'
import { browserHistory } from 'react-router'

function mapStateToProps(state) {
  return {
    users: state.users,
    auth: state.auth,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    selectUser: user => {
      dispatch(selectUser(user))
      browserHistory.push('/user')
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Users)
