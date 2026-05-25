import { connect } from 'react-redux'
import CartView from '../components/CartView'
import { submitOrder } from '../reducers/orders'
import { removeFromCart } from '../reducers/cart'
import withNavigate, { WithNavigateProps } from '../utils/withNavigate'
import type { RootState, AppDispatch } from '../store'
import type { CartItem } from '../types'

function mapStateToProps(state: RootState) {
  return {
    cart: state.cart,
    auth: state.auth,
  }
}

function mapDispatchToProps(dispatch: AppDispatch, ownProps: WithNavigateProps) {
  return {
    submitOrder: (cart: CartItem[]) => {
      dispatch(submitOrder(cart, ownProps.navigate))
    },
    removeFromCart: (productId: number) => {
      dispatch(removeFromCart(productId))
    },
    navigateToLogin: () => {
      ownProps.navigate('/login')
    },
  }
}

export default withNavigate(connect(mapStateToProps, mapDispatchToProps)(CartView))
