'use strict'

import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default props => {
  const [navOpen, setNavOpen] = useState(false)
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="/products">
          <img id="brand" alt="Brand" src="/images/brand.png" />
          <span id="brand-title">Cookie Monsters</span>
        </a>
        <button
          type="button"
          className={`navbar-toggler${navOpen ? '' : ' collapsed'}`}
          onClick={() => setNavOpen(open => !open)}
          aria-expanded={navOpen}
        >
          <span className="visually-hidden">Toggle navigation</span>
          <span className="navbar-toggler-icon" />
        </button>
        <div
          className={`collapse navbar-collapse${navOpen ? ' show' : ''}`}
          id="bs-example-navbar-collapse-1"
        >
          {props.auth ? (
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <p className="navbar-text">
                  Hello,{' '}
                  <a
                    onClick={evt => {
                      evt.preventDefault()
                      props.selectUser(props.auth)
                    }}
                  >
                    {props.auth.name}
                  </a>
                  !
                </p>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/myorders">My Orders</Link>
              </li>
              {props.auth.isAdmin ? (
                <li className="nav-item">
                  <Link className="nav-link" to="/users">Users</Link>
                </li>
              ) : (
                ''
              )}
              <li className="nav-item">
                <a
                  className="nav-link"
                  onClick={evt => {
                    evt.preventDefault()
                    props.logout()
                  }}
                >
                  Logout
                </a>
              </li>
            </ul>
          ) : (
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/signup">Sign Up</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  )
}
