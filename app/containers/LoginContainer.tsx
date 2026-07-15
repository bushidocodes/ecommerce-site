import { connect } from 'react-redux';
import Login from '../components/Login';
import { login } from '../reducers/auth';
import type { AppDispatch } from '../store';
import withNavigate, { WithNavigateProps } from '../utils/withNavigate';

function mapDispatchToProps(
  dispatch: AppDispatch,
  ownProps: WithNavigateProps
) {
  return {
    login: (username: string, password: string) => {
      dispatch(login(username, password)).then(() =>
        ownProps.navigate('/products')
      );
    },
  };
}

export default withNavigate(connect(null, mapDispatchToProps)(Login));
