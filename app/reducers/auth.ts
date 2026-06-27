import { createSlice, createAction, PayloadAction } from '@reduxjs/toolkit';
import { getJSON, postJSON } from '../api';
import type { AppDispatch } from '../store';
import type { User } from '../types';

export const wipeLocalState = createAction('auth/wipeLocalState');

const authSlice = createSlice({
  name: 'auth',
  initialState: null as User | null,
  reducers: {
    authenticated: (_state, action: PayloadAction<User | null>) =>
      action.payload,
  },
});

export const { authenticated } = authSlice.actions;

export const whoami = () => (dispatch: AppDispatch) =>
  getJSON<User | null>('/api/auth/whoami')
    .then(user => dispatch(authenticated(user)))
    .catch(() => dispatch(authenticated(null)));

export const login =
  (username: string, password: string) => (dispatch: AppDispatch) =>
    postJSON('/api/auth/local/login', { username, password })
      .then(() => dispatch(whoami()))
      .catch(() => dispatch(whoami()));

export const signup =
  (name: string, email: string, password: string) => (dispatch: AppDispatch) =>
    postJSON('/api/auth/local/signup', { name, email, password })
      .then(() => dispatch(whoami()))
      .catch(() => dispatch(whoami()));

export const logout = () => (dispatch: AppDispatch) =>
  postJSON('/api/auth/logout')
    .then(() => {
      dispatch(whoami());
      dispatch(wipeLocalState());
    })
    .catch(() => {
      dispatch(whoami());
      dispatch(wipeLocalState());
    });

export default authSlice.reducer;
