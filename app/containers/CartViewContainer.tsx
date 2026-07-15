import { connect } from 'react-redux';
import CartView from '../components/CartView';
import { removeFromCart } from '../reducers/cart';
import { submitOrder } from '../reducers/orders';
import type { AppDispatch, RootState } from '../store';
import type { CartItem } from '../types';
import withNavigate, { WithNavigateProps } from '../utils/withNavigate';

function mapStateToProps(state: RootState) {
  return {
    cart: state.cart,
    auth: state.auth,
    successMessage: state.orders.successMessage,
    errorMessage: state.orders.errorMessage,
  };
}

function mapDispatchToProps(
  dispatch: AppDispatch,
  ownProps: WithNavigateProps
) {
  return {
    submitOrder: (cart: CartItem[]) => {
      dispatch(submitOrder(cart, ownProps.navigate));
    },
    removeFromCart: (productId: number) => {
      dispatch(removeFromCart(productId));
    },
    navigateToLogin: () => {
      ownProps.navigate('/login');
    },
  };
}

export default withNavigate(
  connect(mapStateToProps, mapDispatchToProps)(CartView)
);
