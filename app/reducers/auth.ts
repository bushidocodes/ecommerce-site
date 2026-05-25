import { createSlice, createAction, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import type { AppDispatch } from '../store'
import type { User } from '../types'

export const wipeLocalState = createAction('auth/wipeLocalState')

const authSlice = createSlice({
  name: 'auth',
  initialState: null as User | null,
  reducers: {
    authenticated: (_state, action: PayloadAction<User | null>) => action.payload,
  },
})

export const { authenticated } = authSlice.actions

export const whoami = () => (dispatch: AppDispatch) =>
  axios
    .get('/api/auth/whoami')
    .then(response => dispatch(authenticated(response.data)))
    .catch(() => dispatch(authenticated(null)))

export const login = (username: string, password: string) => (dispatch: AppDispatch) =>
  axios
    .post('/api/auth/local/login', { username, password })
    .then(() => dispatch(whoami()))
    .catch(() => dispatch(whoami()))

export const signup = (username: string, password: string) => (dispatch: AppDispatch) =>
  axios
    .post('/api/auth/local/signup', { username, password })
    .then(() => dispatch(whoami()))
    .catch(() => dispatch(whoami()))

export const logout = () => (dispatch: AppDispatch) =>
  axios
    .post('/api/auth/logout')
    .then(() => { dispatch(whoami()); dispatch(wipeLocalState()) })
    .catch(() => { dispatch(whoami()); dispatch(wipeLocalState()) })

export default authSlice.reducer
