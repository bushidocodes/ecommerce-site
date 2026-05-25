import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { wipeLocalState } from './auth'

const initialState = { users: [], selectedUser: {} }

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, action) => { state.users = action.payload },
    selectUser: (state, action) => { state.selectedUser = action.payload },
  },
  extraReducers: builder => {
    builder.addCase(wipeLocalState, () => initialState)
  },
})

export const { selectUser } = usersSlice.actions

export const receiveUsers = () => dispatch =>
  axios
    .get('/api/users/')
    .then(res => dispatch(usersSlice.actions.setUsers(res.data)))
    .catch(err => console.error(err))

export default usersSlice.reducer
