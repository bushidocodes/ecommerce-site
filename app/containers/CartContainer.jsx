import { connect } from 'react-redux'
import Cart from '../components/Cart'

function mapStateToProps(state) {
  return {
    cart: state.cart,
  }
}

export default connect(mapStateToProps)(Cart)
