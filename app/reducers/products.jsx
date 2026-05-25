import { createSlice } from '@reduxjs/toolkit'

const productsSlice = createSlice({
  name: 'products',
  initialState: [],
  reducers: {
    receiveProducts: (state, action) => action.payload,
  },
})

export const { receiveProducts } = productsSlice.actions
export default productsSlice.reducer
