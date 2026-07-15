import { useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import Users from '../components/Users';
import { receiveUsers, selectUser } from '../reducers/users';
import type { AppDispatch, RootState } from '../store';
import type { User } from '../types';
import withNavigate, { WithNavigateProps } from '../utils/withNavigate';

function mapStateToProps(state: RootState) {
  return {
    users: state.users,
    auth: state.auth,
  };
}

function mapDispatchToProps(
  dispatch: AppDispatch,
  ownProps: WithNavigateProps
) {
  return {
    selectUser: (user: Partial<User>) => {
      dispatch(selectUser(user));
      ownProps.navigate('/user');
    },
  };
}

function UsersPage(
  props: ReturnType<typeof mapStateToProps> &
    ReturnType<typeof mapDispatchToProps>
) {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(receiveUsers());
  }, [dispatch]);
  return <Users {...props} />;
}

export default withNavigate(
  connect(mapStateToProps, mapDispatchToProps)(UsersPage)
);
