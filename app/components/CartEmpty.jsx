import React, { Component } from 'react'

export default props => {
  return (
    <div id="cart-empty-container" className="container">
      <div className="jumbotron center">
        <h1>Uh oh!...</h1>
        <br />
        <p>You have no cookies in your cart. Add some cookies, ya idiot!</p>
        <div className="text-center">
          <p>
            <a
              href="/products"
              className="btn btn-primary btn-lg"
              role="button"
            >
              Go!
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
