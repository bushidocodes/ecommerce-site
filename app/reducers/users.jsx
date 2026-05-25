import axios from 'axios'

// Constants
const GET_USERS = 'GET_USERS'
const SELECT_USER = 'SELECT_USER'

// Reducers
export const initialUsersState = {
  users: [],
  selectedUser: {},
}

const reducer = (state = initialUsersState, action) => {
  const newState = Object.assign({}, state)

  switch (action.type) {
    case GET_USERS:
      newState.users = action.users
      break
    case SELECT_USER:
      newState.selectedUser = action.selectedUser
      break
    default:
      return state
  }
  return newState
}

// Actions
export const getUsers = users => ({
  type: GET_USERS,
  users,
})

export const selectUser = selectedUser => ({
  type: SELECT_USER,
  selectedUser,
})

export function receiveUsers() {
  console.log('Receiving Users')
  // Return a thunk
  return function (dispatch) {
    axios
      .get('/api/users/')
      .then(res => dispatch(getUsers(res.data)))
      .catch(err => alert(err))
  }
}

export default reducer
