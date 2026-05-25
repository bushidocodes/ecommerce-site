import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { emptyCart } from './cart'

const ordersSlice = createSlice({
  name: 'orders',
  initialState: { orders: [], selectedOrder: {} },
  reducers: {
    setOrders: (state, action) => { state.orders = action.payload },
    selectOrder: (state, action) => { state.selectedOrder = action.payload },
  },
})

export const { selectOrder } = ordersSlice.actions

export const receiveOrders = () => dispatch =>
  axios
    .get('/api/orders/')
    .then(res => dispatch(ordersSlice.actions.setOrders(res.data)))
    .catch(err => console.error(err))

export function submitOrder(cart, navigate) {
  const orderLineItems = {}
  cart.forEach(item => {
    orderLineItems[item.product.id] = { quantity: item.quantity }
  })
  const order = { shippingCarrier: 'UPS', orderLineItems }
  return dispatch =>
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
