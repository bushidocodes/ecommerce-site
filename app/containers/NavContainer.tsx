import { connect } from 'react-redux';
import Nav from '../components/Nav';
import { logout } from '../reducers/auth';
import { selectUser } from '../reducers/users';
import type { AppDispatch, RootState } from '../store';
import type { User } from '../types';
import withNavigate, { WithNavigateProps } from '../utils/withNavigate';

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
