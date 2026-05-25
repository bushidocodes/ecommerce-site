'use strict'

import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default props => {
  const [navOpen, setNavOpen] = useState(false)
  return (
  <nav className="navbar navbar-default">
    <div className="container-fluid">
      {/* Brand and toggle get grouped for better mobile display */}
      <div className="navbar-header">
        <button
          type="button"
          className={`navbar-toggle${navOpen ? '' : ' collapsed'}`}
          onClick={() => setNavOpen(open => !open)}
          aria-expanded={navOpen}
        >
          <span className="sr-only">Toggle navigation</span>
          <span className="icon-bar" />
          <span className="icon-bar" />
          <span className="icon-bar" />
        </button>
        <a className="navbar-brand" href="/products">
          <img id="brand" alt="Brand" src="/images/brand.png" />
          <span id="brand-title">Cookie Monsters</span>
        </a>
      </div>
      {/* Collect the nav links, forms, and other content for toggling */}
      <div
        className={`collapse navbar-collapse${navOpen ? ' in' : ''}`}
        id="bs-example-navbar-collapse-1"
      >
        {/* handles if user is logged in or not */}
        {/* have to put ul's inside ternary for styling purposes */}
        {props.auth ? (
          <ul className="nav navbar-nav navbar-right">
            <li>
              {/* TODO: this link doesn't work correctly yet */}
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
            <li>
              <Link to="/myorders">My Orders</Link>
            </li>
            {props.auth.isAdmin ? (
              <li>
                <Link to="/users">Users</Link>
              </li>
            ) : (
              ''
            )}
            <li>
              <a
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
          <div>
            <ul className="nav navbar-nav navbar-right">
              <li>
                <Link to="/signup">Sign Up</Link>
              </li>
              <li>
                <Link to="/login">Login</Link>
              </li>
            </ul>
          </div>
        )}
      </div>
      {/* /.navbar-collapse */}
    </div>
    {/* /.container-fluid */}
  </nav>
  )
}
