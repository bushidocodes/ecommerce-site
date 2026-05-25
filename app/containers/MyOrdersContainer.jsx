import React, { useEffect } from 'react'
import { connect, useDispatch } from 'react-redux'
import MyOrders from '../components/MyOrders'
import { selectOrder, receiveOrders } from '../reducers/orders'

function mapStateToProps(state) {
  return {
    orders: state.orders.orders,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    selectOrder: order => {
      dispatch(selectOrder(order))
    },
  }
}

function MyOrdersPage(props) {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(receiveOrders())
  }, [dispatch])
  return <MyOrders {...props} />
}

export default connect(mapStateToProps, mapDispatchToProps)(MyOrdersPage)
