'use strict'

import React from 'react'
import { Link } from 'react-router'

export default props => {
  return (
    <div id="cart-line-item" className="container">
      <div className="panel panel-success">
        <div className="panel-heading">
          <div className="row">
            <div className="col-sm-10 col-xs-9">
              <h3 className="panel-title text-left">{props.name}</h3>
            </div>
            <div className="col-sm-2 col-xs-3 text-right">
              <button id="remove-from-cart" className="btn btn-sm btn-danger">
                Remove
              </button>
            </div>
          </div>
        </div>
        <div className="panel-body">
          <div className="media">
            <div className="media-left">
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
            </div>
            <div className="media-body">
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
