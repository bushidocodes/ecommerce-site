import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { NavigateFunction } from 'react-router-dom';
import { getJSON, postJSON } from '../api';
import type { AppDispatch } from '../store';
import type { CartItem, Order } from '../types';
import { emptyCart } from './cart';

interface OrdersState {
  orders: Order[];
  selectedOrder: Partial<Order>;
  successMessage: string | null;
  errorMessage: string | null;
}

const ordersSlice = createSlice({
  name: 'orders',
  initialState: {
    orders: [],
    selectedOrder: {},
    successMessage: null,
    errorMessage: null,
  } as OrdersState,
  reducers: {
    setOrders: (state, action: PayloadAction<Order[]>) => {
      state.orders = action.payload;
    },
    selectOrder: (state, action: PayloadAction<Partial<Order>>) => {
      state.selectedOrder = action.payload;
    },
    setOrderSuccess: (state, action: PayloadAction<string | null>) => {
      state.successMessage = action.payload;
      state.errorMessage = null;
    },
    setOrderError: (state, action: PayloadAction<string | null>) => {
      state.errorMessage = action.payload;
      state.successMessage = null;
    },
  },
});

export const { selectOrder, setOrderSuccess, setOrderError } =
  ordersSlice.actions;

export const receiveOrders = () => (dispatch: AppDispatch) =>
  getJSON<Order[]>('/api/orders/')
    .then(orders => dispatch(ordersSlice.actions.setOrders(orders)))
    .catch(err => console.error(err));

export function submitOrder(cart: CartItem[], navigate?: NavigateFunction) {
  const orderLineItems: Record<number, { quantity: number }> = {};
  cart.forEach(item => {
    orderLineItems[item.product.id] = { quantity: item.quantity };
  });
  const order = { shippingCarrier: 'UPS', orderLineItems };
  return (dispatch: AppDispatch) =>
    postJSON('/api/orders/', order)
      .then(() => {
        dispatch(setOrderSuccess('Cookies are on the way!'));
        dispatch(emptyCart());
        navigate && navigate('/myorders');
      })
      .catch(err => {
        const message =
          err?.message || 'Order submission failed. Please try again.';
        console.error('Order submission error:', err);
        dispatch(setOrderError(message));
      });
}

export default ordersSlice.reducer;
