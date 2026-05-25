import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { emptyCart } from './cart'
import type { AppDispatch } from '../store'
import type { CartItem, Order } from '../types'
import type { NavigateFunction } from 'react-router-dom'

interface OrdersState {
  orders: Order[]
  selectedOrder: Partial<Order>
}

const ordersSlice = createSlice({
  name: 'orders',
  initialState: { orders: [], selectedOrder: {} } as OrdersState,
  reducers: {
    setOrders: (state, action: PayloadAction<Order[]>) => { state.orders = action.payload },
    selectOrder: (state, action: PayloadAction<Partial<Order>>) => { state.selectedOrder = action.payload },
  },
})

export const { selectOrder } = ordersSlice.actions

export const receiveOrders = () => (dispatch: AppDispatch) =>
  axios
    .get('/api/orders/')
    .then(res => dispatch(ordersSlice.actions.setOrders(res.data)))
    .catch(err => console.error(err))

export function submitOrder(cart: CartItem[], navigate?: NavigateFunction) {
  const orderLineItems: Record<number, { quantity: number }> = {}
  cart.forEach(item => {
    orderLineItems[item.product.id] = { quantity: item.quantity }
  })
  const order = { shippingCarrier: 'UPS', orderLineItems }
  return (dispatch: AppDispatch) =>
    axios
      .post('/api/orders/', order)
      .then(() => {
        alert('Cookies are on the way!')
        dispatch(emptyCart())
        navigate && navigate('/myorders')
      })
      .catch(err => alert(err))
}

export default ordersSlice.reducer
