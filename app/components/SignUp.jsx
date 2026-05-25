import React from 'react'

export const Signup = ({ signup }) => (
  <div className="container">
    <h1 className="display-4">Sign Up</h1>
    <form
      onSubmit={evt => {
        evt.preventDefault()
        signup(evt.target.username.value, evt.target.password.value)
      }}
    >
      <input
        className="form-control auth-field"
        name="username"
        placeholder="Username"
      />
      <input
        className="form-control auth-field"
        name="password"
        type="password"
        placeholder="Password"
      />
      <input className="btn btn-primary" type="submit" value="Sign Up" />
    </form>
  </div>
)

import { signup } from '../reducers/auth'
import { connect } from 'react-redux'

export default connect(state => ({}), { signup })(Signup)
