import { connect } from 'react-redux';
import Products from '../components/Products';
import { addToCart } from '../reducers/cart';
import type { RootState, AppDispatch } from '../store';
import type { Product } from '../types';

function mapStateToProps(state: RootState) {
  return {
    products: state.products,
  };
}

function mapDispatchToProps(dispatch: AppDispatch) {
  return {
    plusItemzToCart: (product: Product, quantity: number) => {
      dispatch(addToCart(product, quantity));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Products);
