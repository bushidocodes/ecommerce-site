'use strict'

import React from 'react'
import { Link, Navigate } from 'react-router-dom'

export default props => {
  let user = props.user
  if (!user || user === '') {
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
            value={user.name}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            value={user.email}
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
            aria-describedby="billingAddress"
            value={user.billingAddress}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="billingCity">City</label>
          <input
            type="text"
            className="form-control"
            id="billingCity"
            aria-describedby="billingCity"
            value={user.billingCity}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="billingState">State</label>
          <input
            type="text"
            className="form-control"
            id="billingState"
            aria-describedby="billingState"
            value={user.billingState}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="billingZip">Zip Code</label>
          <input
            type="text"
            className="form-control"
            id="billingZip"
            aria-describedby="billingZip"
            value={user.billingZip}
          />
        </div>
        <h4>Shipping Address</h4>
        <div className="mb-3">
          <label htmlFor="shippingAddress">Address</label>
          <input
            type="text"
            className="form-control"
            id="shippingAddress"
            aria-describedby="shippingAddress"
            value={user.shippingAddress}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="shippingCity">City</label>
          <input
            type="text"
            className="form-control"
            id="shippingCity"
            aria-describedby="shippingCity"
            value={user.shippingCity}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="shippingState">State</label>
          <input
            type="text"
            className="form-control"
            id="shippingState"
            aria-describedby="shippingState"
            value={user.shippingState}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="shippingZip">Zip Code</label>
          <input
            type="text"
            className="form-control"
            id="shippingZip"
            aria-describedby="shippingZip"
            value={user.shippingZip}
          />
        </div>
        {props.auth && props.auth.isAdmin ? (
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
                  disabled={user.isAdmin ? 'disabled' : false}
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
                  disabled={user.isAdmin ? false : 'disabled'}
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
