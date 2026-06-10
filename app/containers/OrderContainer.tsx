import { connect } from 'react-redux';
import Order from '../components/Order';
import type { RootState } from '../store';

function mapStateToProps(state: RootState) {
  return {
    order: state.orders.selectedOrder,
  };
}

export default connect(mapStateToProps)(Order);
