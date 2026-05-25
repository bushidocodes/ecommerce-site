import React from 'react'
import { connect } from 'react-redux'
import { signup } from '../reducers/auth'
import type { AppDispatch } from '../store'

interface SignupProps {
  signup: (username: string, password: string) => void
}

export const Signup = ({ signup }: SignupProps) => (
  <div className="container">
    <h1 className="display-4">Sign Up</h1>
    <form
      onSubmit={evt => {
        evt.preventDefault()
        const form = evt.currentTarget
        const username = (form.elements.namedItem('username') as HTMLInputElement).value
        const password = (form.elements.namedItem('password') as HTMLInputElement).value
        signup(username, password)
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

function mapDispatchToProps(dispatch: AppDispatch) {
  return {
    signup: (username: string, password: string) =>
      dispatch(signup(username, password)),
  }
}

export default connect(null, mapDispatchToProps)(Signup)
