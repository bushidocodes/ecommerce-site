import axios from 'axios'

const reducer = (state = null, action) => {
  switch (action.type) {
    case AUTHENTICATED:
      return action.user
  }
  return state
}

const AUTHENTICATED = 'AUTHENTICATED'
export const authenticated = user => ({
  type: AUTHENTICATED,
  user,
})

// wipeLocalState is an action creator that dispatches an action that the rrot reducer uses as a hook
// to know when to clear the cart. The idea is that a cart should persist in localStorage until a
// user logs out of the site. This theoretically could be used with server site persistance of carts for
// logged in users in the future.

const WIPELOCALSTATE = 'WIPELOCALSTATE'
export const wipeLocalState = () => ({
  type: WIPELOCALSTATE,
})

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

export const logout = () => dispatch => {
  console.log('dispatch: ', dispatch)
  axios
    .post('/api/auth/logout')
    .then(() => {
      dispatch(whoami())
      dispatch(wipeLocalState())
    })
    .catch(() => {
      dispatch(whoami())
      dispatch(wipeLocalState())
    })
}

export const whoami = () => dispatch =>
  axios
    .get('/api/auth/whoami')
    .then(response => {
      const user = response.data
      dispatch(authenticated(user))
    })
    .catch(failed => dispatch(authenticated(null)))

export default reducer
