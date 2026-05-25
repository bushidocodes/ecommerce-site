import React from 'react'
import { Link } from 'react-router-dom'

interface CartLineItemProps {
  name: string
  quantity: number
  photo: string
  description: string
  price: number
  onRemove: () => void
}

export default function CartLineItem({ name, quantity, photo, description, price, onRemove }: CartLineItemProps) {
  return (
    <div id="cart-line-item" className="container">
      <div className="card border-success">
        <div className="card-header">
          <div className="row">
            <div className="col-sm-10 col-9">
              <h3 className="card-title text-start">{name}</h3>
            </div>
            <div className="col-sm-2 col-3 text-end">
              <button
                id="remove-from-cart"
                className="btn btn-sm btn-danger"
                onClick={evt => { evt.preventDefault(); onRemove() }}
              >
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
                  src={photo}
                  alt={name}
                />
              </Link>
            </div>
            <div>
              <p>{description}</p>
              <p>Qty: {quantity}</p>
              <p>Price: ${(price * quantity).toFixed(2)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
