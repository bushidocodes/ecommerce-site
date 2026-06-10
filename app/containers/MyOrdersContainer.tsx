import React, { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import MyOrders from '../components/MyOrders';
import { selectOrder, receiveOrders } from '../reducers/orders';
import type { RootState, AppDispatch } from '../store';
import type { Order } from '../types';

function mapStateToProps(state: RootState) {
  return {
    orders: state.orders.orders,
  };
}

function mapDispatchToProps(dispatch: AppDispatch) {
  return {
    selectOrder: (order: Partial<Order>) => {
      dispatch(selectOrder(order));
    },
  };
}

function MyOrdersPage(
  props: ReturnType<typeof mapStateToProps> &
    ReturnType<typeof mapDispatchToProps>
) {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(receiveOrders());
  }, [dispatch]);
  return <MyOrders {...props} />;
}

export default connect(mapStateToProps, mapDispatchToProps)(MyOrdersPage);
