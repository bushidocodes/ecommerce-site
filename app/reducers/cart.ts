import { createSlice, current, PayloadAction } from '@reduxjs/toolkit';
import type { CartItem, Product } from '../types';
import { wipeLocalState } from './auth';

const cartSlice = createSlice({
  name: 'cart',
  initialState: JSON.parse(localStorage.getItem('cart') || '[]') as CartItem[],
  reducers: {
    addToCart: {
      reducer(
        state,
        action: PayloadAction<{ product: Product; quantity: number }>
      ) {
        const { product, quantity } = action.payload;
        const existing = state.find(item => item.product.id === product.id);
        if (existing) {
          existing.quantity += quantity;
        } else {
          state.push({ product, quantity });
        }
        localStorage.setItem('cart', JSON.stringify(current(state)));
      },
      prepare(product: Product, quantity: number) {
        return { payload: { product, quantity } };
      },
    },
    removeFromCart(state, action: PayloadAction<number>) {
      const next = state.filter(item => item.product.id !== action.payload);
      localStorage.setItem('cart', JSON.stringify(next));
      return next;
    },
    emptyCart(): CartItem[] {
      localStorage.removeItem('cart');
      return [];
    },
  },
  extraReducers: builder => {
    builder.addCase(wipeLocalState, (): CartItem[] => {
      localStorage.removeItem('cart');
      return [];
    });
  },
});

export const { addToCart, removeFromCart, emptyCart } = cartSlice.actions;
export default cartSlice.reducer;
