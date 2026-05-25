import { connect } from 'react-redux'
import CartView from '../components/CartView'
import { submitOrder } from '../reducers/orders'
import withNavigate, { WithNavigateProps } from '../utils/withNavigate'
import type { RootState, AppDispatch } from '../store'
import type { CartItem } from '../types'

function mapStateToProps(state: RootState) {
  return {
    cart: state.cart,
  }
}

function mapDispatchToProps(dispatch: AppDispatch, ownProps: WithNavigateProps) {
  return {
    submitOrder: (cart: CartItem[]) => {
      dispatch(submitOrder(cart, ownProps.navigate))
    },
  }
}

export default withNavigate(connect(mapStateToProps, mapDispatchToProps)(CartView))
