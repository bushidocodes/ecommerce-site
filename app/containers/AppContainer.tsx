import { connect } from 'react-redux'
import App from '../components/App'
import type { RootState } from '../store'

function mapStateToProps(state: RootState) {
  return {
    products: state.products,
  }
}

export default connect(mapStateToProps)(App)
