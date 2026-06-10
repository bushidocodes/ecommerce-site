import React from 'react';
import { connect } from 'react-redux';
import { logout } from '../reducers/auth';
import type { RootState, AppDispatch } from '../store';
import type { User } from '../types';

interface WhoAmIProps {
  user: User | null;
  logout: () => void;
}

export const WhoAmI = ({ user, logout }: WhoAmIProps) => (
  <div className="whoami">
    <span className="whoami-user-name">{user && user.name}</span>
    <button className="logout" onClick={logout}>
      Logout
    </button>
  </div>
);

function mapStateToProps(state: RootState) {
  return { user: state.auth };
}

function mapDispatchToProps(dispatch: AppDispatch) {
  return { logout: () => dispatch(logout()) };
}

export default connect(mapStateToProps, mapDispatchToProps)(WhoAmI);
