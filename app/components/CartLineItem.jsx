'use strict'

import React from 'react'
import { Link } from 'react-router-dom'

export default props => {
  return (
    <div id="cart-line-item" className="container">
      <div className="card border-success">
        <div className="card-header">
          <div className="row">
            <div className="col-sm-10 col-9">
              <h3 className="card-title text-start">{props.name}</h3>
            </div>
            <div className="col-sm-2 col-3 text-end">
              <button id="remove-from-cart" className="btn btn-sm btn-danger">
                Remove
              </button>
            </div>
          </div>
        </div>
        <div className="card-body">
          <div className="d-flex gap-3">
            <div className="thumbContainer">
              <Link to="/reviews">
                {' '}
                <img
                  className="thumbImg"
                  src={props.photo}
                  alt={props.name}
                />
              </Link>
            </div>
            <div>
              <p>{props.description}</p>
              <p>Qty: {props.quantity}</p>
              <p>Price: ${(props.price * props.quantity).toFixed(2)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
