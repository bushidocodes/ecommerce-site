import { createSlice, current } from '@reduxjs/toolkit'
import { wipeLocalState } from './auth'

const cartSlice = createSlice({
  name: 'cart',
  initialState: JSON.parse(localStorage.getItem('cart') || '[]'),
  reducers: {
    addToCart: {
      reducer(state, action) {
        const { product, quantity } = action.payload
        const existing = state.find(item => item.product.id === product.id)
        if (existing) {
          existing.quantity += quantity
        } else {
          state.push({ product, quantity })
        }
        localStorage.setItem('cart', JSON.stringify(current(state)))
      },
      prepare(product, quantity) {
        return { payload: { product, quantity } }
      },
    },
    emptyCart() {
      localStorage.removeItem('cart')
      return []
    },
  },
  extraReducers: builder => {
    builder.addCase(wipeLocalState, () => {
      localStorage.removeItem('cart')
      return []
    })
  },
})

export const { addToCart, emptyCart } = cartSlice.actions
export default cartSlice.reducer
