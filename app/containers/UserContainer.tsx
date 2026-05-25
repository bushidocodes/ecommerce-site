import { connect } from 'react-redux'
import User from '../components/User'
import type { RootState } from '../store'

function mapStateToProps(state: RootState) {
  return {
    user: state.users.selectedUser,
    auth: state.auth,
  }
}

export default connect(mapStateToProps)(User)
