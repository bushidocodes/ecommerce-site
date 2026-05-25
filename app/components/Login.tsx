import React from 'react'

interface LoginProps {
  login: (username: string, password: string) => void
}

export default function Login({ login }: LoginProps) {
  return (
    <div className="container">
      <h1 className="display-4">Login</h1>
      <form
        onSubmit={evt => {
          evt.preventDefault()
          const form = evt.currentTarget
          const username = (form.elements.namedItem('username') as HTMLInputElement).value
          const password = (form.elements.namedItem('password') as HTMLInputElement).value
          login(username, password)
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
