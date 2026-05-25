import { connect } from 'react-redux'
import Cart from '../components/Cart'
import type { RootState } from '../store'

function mapStateToProps(state: RootState) {
  return {
    cart: state.cart,
  }
}

export default connect(mapStateToProps)(Cart)
