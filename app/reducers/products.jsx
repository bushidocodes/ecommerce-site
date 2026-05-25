import axios from 'axios'

const reducer = (state = [], action) => {
  let newState = Object.assign({}, state)

  switch (action.type) {
    case RECEIVE_PRODUCTS:
      newState = action.products
      break
    default:
      return state
  }
  return newState
}

const RECEIVE_PRODUCTS = 'RECEIVE_PRODUCTS'
export const receiveProducts = products => ({
  type: RECEIVE_PRODUCTS,
  products,
})

export default reducer
