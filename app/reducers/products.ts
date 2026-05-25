import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { Product } from '../types'

const productsSlice = createSlice({
  name: 'products',
  initialState: [] as Product[],
  reducers: {
    receiveProducts: (_state, action: PayloadAction<Product[]>) => action.payload,
  },
})

export const { receiveProducts } = productsSlice.actions
export default productsSlice.reducer
