import React from 'react'
import Hero from './Hero'
import CartEmpty from './CartEmpty'
import CartLineItem from './CartLineItem'

export default props => {
  return (
    <div id="cart-view" className="container">
      <Hero />
      <br />
      <div className="row">
        <div className="col-sm-6 col-xs-12">
          {props.cart < 1 ? (
            <CartEmpty />
          ) : (
            props.cart.map(item => (
              <CartLineItem
                key={item.product.id}
                name={item.product.name}
                quantity={item.quantity}
                photo={item.product.photo}
                description={item.product.description}
                price={item.product.price}
              />
            ))
          )}
        </div>
      </div>
      {props.cart.length > 0 ? (
        <div className="text-center">
          <button
            onClick={evt => {
              evt.preventDefault()
              props.submitOrder(props.cart)
            }}
            className="btn btn-success btn-lg"
          >
            Checkout
          </button>
        </div>
      ) : (
        ''
      )}
      <br />
    </div>
  )
}
