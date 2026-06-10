import { connect } from 'react-redux';
import Nav from '../components/Nav';
import { selectUser } from '../reducers/users';
import { logout } from '../reducers/auth';
import withNavigate, { WithNavigateProps } from '../utils/withNavigate';
import type { RootState, AppDispatch } from '../store';
import type { User } from '../types';

function mapStateToProps(state: RootState) {
  return {
    auth: state.auth,
  };
}

function mapDispatchToProps(
  dispatch: AppDispatch,
  ownProps: WithNavigateProps
) {
  return {
    logout: () => {
      dispatch(logout());
      ownProps.navigate('/');
    },
    selectUser: (user: Partial<User>) => {
      dispatch(selectUser(user));
      ownProps.navigate('/user');
    },
  };
}

export default withNavigate(connect(mapStateToProps, mapDispatchToProps)(Nav));
