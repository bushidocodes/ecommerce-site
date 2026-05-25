import { createSlice, createAction } from '@reduxjs/toolkit'
import axios from 'axios'

export const wipeLocalState = createAction('auth/wipeLocalState')

const authSlice = createSlice({
  name: 'auth',
  initialState: null,
  reducers: {
    authenticated: (state, action) => action.payload,
  },
})

export const { authenticated } = authSlice.actions

export const whoami = () => dispatch =>
  axios
    .get('/api/auth/whoami')
    .then(response => dispatch(authenticated(response.data)))
    .catch(() => dispatch(authenticated(null)))

export const login = (username, password) => dispatch =>
  axios
    .post('/api/auth/local/login', { username, password })
    .then(() => dispatch(whoami()))
    .catch(() => dispatch(whoami()))

export const signup = (username, password) => dispatch =>
  axios
    .post('/api/auth/local/signup', { username, password })
    .then(() => dispatch(whoami()))
    .catch(() => dispatch(whoami()))

export const logout = () => dispatch =>
  axios
    .post('/api/auth/logout')
    .then(() => { dispatch(whoami()); dispatch(wipeLocalState()) })
    .catch(() => { dispatch(whoami()); dispatch(wipeLocalState()) })

export default authSlice.reducer
