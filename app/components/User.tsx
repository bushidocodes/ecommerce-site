import React from 'react'
import { Link, Navigate } from 'react-router-dom'
import type { User as UserType } from '../types'

interface UserProps {
  user: Partial<UserType>
  auth: UserType | null
}

export default function User({ user, auth }: UserProps) {
  if (!user || !user.name) {
    return <Navigate to="/login" replace />
  }
  return (
    <div className="container">
      <div className="col-12 col-sm-4">
        <h2>{user.name}</h2>
        <div className="mb-3">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            aria-describedby="emailHelp"
            value={user.name ?? ''}
            readOnly
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            value={user.email ?? ''}
            readOnly
          />
          <small id="emailHelp" className="form-text text-muted">
            We&apos;ll never share your email with anyone else.
          </small>
        </div>
        <h4>Billing Address</h4>
        <div className="mb-3">
          <label htmlFor="billingAddress">Address</label>
          <input
            type="text"
            className="form-control"
            id="billingAddress"
            value={user.billingAddress ?? ''}
            readOnly
          />
        </div>
        <div className="mb-3">
          <label htmlFor="billingCity">City</label>
          <input
            type="text"
            className="form-control"
            id="billingCity"
            value={user.billingCity ?? ''}
            readOnly
          />
        </div>
        <div className="mb-3">
          <label htmlFor="billingState">State</label>
          <input
            type="text"
            className="form-control"
            id="billingState"
            value={user.billingState ?? ''}
            readOnly
          />
        </div>
        <div className="mb-3">
          <label htmlFor="billingZip">Zip Code</label>
          <input
            type="text"
            className="form-control"
            id="billingZip"
            value={user.billingZip ?? ''}
            readOnly
          />
        </div>
        <h4>Shipping Address</h4>
        <div className="mb-3">
          <label htmlFor="shippingAddress">Address</label>
          <input
            type="text"
            className="form-control"
            id="shippingAddress"
            value={user.shippingAddress ?? ''}
            readOnly
          />
        </div>
        <div className="mb-3">
          <label htmlFor="shippingCity">City</label>
          <input
            type="text"
            className="form-control"
            id="shippingCity"
            value={user.shippingCity ?? ''}
            readOnly
          />
        </div>
        <div className="mb-3">
          <label htmlFor="shippingState">State</label>
          <input
            type="text"
            className="form-control"
            id="shippingState"
            value={user.shippingState ?? ''}
            readOnly
          />
        </div>
        <div className="mb-3">
          <label htmlFor="shippingZip">Zip Code</label>
          <input
            type="text"
            className="form-control"
            id="shippingZip"
            value={user.shippingZip ?? ''}
            readOnly
          />
        </div>
        {auth && auth.isAdmin ? (
          <fieldset className="mb-3">
            <legend>
              {user.name}{' '}
              {user.isAdmin
                ? 'is a site administrator'
                : 'is not a site administrator'}
            </legend>
            <div className="form-check">
              <label className="form-check-label">
                <input
                  type="radio"
                  className="form-check-input"
                  name="makeAdmin"
                  id="makeAdmin"
                  defaultValue="makeAdmin"
                  disabled={!!user.isAdmin}
                />
                Make {user.name} an Administrator
              </label>
            </div>
            <div className="form-check disabled">
              <label className="form-check-label">
                <input
                  type="radio"
                  className="form-check-input"
                  name="notAdmin"
                  id="notAdmin"
                  defaultValue="notAdmin"
                  disabled={!user.isAdmin}
                />
                Revoke {user.name}&apos;s Administrator rights
              </label>
            </div>
          </fieldset>
        ) : (
          ''
        )}
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
        <Link to="/users" className="btn btn-secondary cancel-btn">
          Cancel
        </Link>
      </div>
    </div>
  )
}
