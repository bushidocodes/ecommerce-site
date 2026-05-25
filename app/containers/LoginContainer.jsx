import Login from '../components/Login.jsx'
import { login } from '../reducers/auth'
import { connect } from 'react-redux'
import withNavigate from '../utils/withNavigate'

function mapDispatchToProps(dispatch, ownProps) {
  return {
    login: (username, password) => {
      dispatch(login(username, password)).then(() => ownProps.navigate('/products'))
    },
  }
}

export default withNavigate(connect(null, mapDispatchToProps)(Login))
