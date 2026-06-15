import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers';
import { whoami } from './reducers/auth';

const store = configureStore({
  reducer: rootReducer,
});

store.dispatch(whoami());

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
