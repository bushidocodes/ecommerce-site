import React from 'react'

export default function (props) {
  let login = props.login
  return (
    <div className="container">
      <h1 className="display-4">Login</h1>
      <form
        onSubmit={evt => {
          evt.preventDefault()
          login(evt.target.username.value, evt.target.password.value)
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
        <input className="btn btn-primary" type="submit" value="Login" />
      </form>
    </div>
  )
}
