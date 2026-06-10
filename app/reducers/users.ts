import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { wipeLocalState } from './auth';
import type { AppDispatch } from '../store';
import type { User } from '../types';

interface UsersState {
  users: User[];
  selectedUser: Partial<User>;
}

const initialState: UsersState = { users: [], selectedUser: {} };

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    },
    selectUser: (state, action: PayloadAction<Partial<User>>) => {
      state.selectedUser = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(wipeLocalState, () => initialState);
  },
});

export const { selectUser } = usersSlice.actions;

export const receiveUsers = () => (dispatch: AppDispatch) =>
  axios
    .get('/api/users/')
    .then(res => dispatch(usersSlice.actions.setUsers(res.data)))
    .catch(err => console.error(err));

export default usersSlice.reducer;
