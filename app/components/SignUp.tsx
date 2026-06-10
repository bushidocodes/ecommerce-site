import React from 'react';
import { connect } from 'react-redux';
import { signup } from '../reducers/auth';
import type { AppDispatch } from '../store';

interface SignupProps {
  signup: (name: string, email: string, password: string) => void;
}

export const Signup = ({ signup }: SignupProps) => (
  <div className="container">
    <h1 className="display-4">Sign Up</h1>
    <form
      onSubmit={evt => {
        evt.preventDefault();
        const form = evt.currentTarget;
        const name = (form.elements.namedItem('name') as HTMLInputElement)
          .value;
        const email = (form.elements.namedItem('email') as HTMLInputElement)
          .value;
        const password = (
          form.elements.namedItem('password') as HTMLInputElement
        ).value;
        signup(name, email, password);
      }}
    >
      <input
        className="form-control auth-field"
        name="name"
        placeholder="Full Name"
      />
      <input
        className="form-control auth-field"
        name="email"
        type="email"
        placeholder="Email"
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
);

function mapDispatchToProps(dispatch: AppDispatch) {
  return {
    signup: (name: string, email: string, password: string) =>
      dispatch(signup(name, email, password)),
  };
}

export default connect(null, mapDispatchToProps)(Signup);
