import User from '../components/User.jsx'
import { connect } from 'react-redux'

function mapStateToProps(state) {
  return {
    user: state.users.selectedUser,
    auth: state.auth,
  }
}

// function mapDispatchToProps(dispatch) {
//   return {
//     login: (username, password) => {
//       dispatch(login(username, password));
//       browserHistory.push('/');

//     }
//   }
// }

export default connect(mapStateToProps)(User)
