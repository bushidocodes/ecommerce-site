import Order from '../components/Order.jsx'
import { connect } from 'react-redux'

function mapStateToProps(state) {
  return {
    order: state.orders.selectedOrder,
  }
}

export default connect(mapStateToProps)(Order)
