import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getJSON } from '../api';
import type { AppDispatch } from '../store';
import type { User } from '../types';
import { wipeLocalState } from './auth';

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
  getJSON<User[]>('/api/users/')
    .then(users => dispatch(usersSlice.actions.setUsers(users)))
    .catch(err => console.error(err));

export default usersSlice.reducer;
