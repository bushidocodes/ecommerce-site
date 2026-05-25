import Login from '../components/Login.jsx'
import { login } from '../reducers/auth'
import { connect } from 'react-redux'

function mapDispatchToProps(dispatch) {
  return {
    login: (username, password) => {
      dispatch(login(username, password))
    },
  }
}

export default connect(null, mapDispatchToProps)(Login)
