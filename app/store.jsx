import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './reducers'
import { createLogger } from 'redux-logger'
import { whoami } from './reducers/auth'

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(createLogger()),
})

store.dispatch(whoami())
export default store
