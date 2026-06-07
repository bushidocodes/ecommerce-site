import React from 'react'
import Hero from './Hero'
import CartEmpty from './CartEmpty'
import CartLineItem from './CartLineItem'
import type { CartItem, User } from '../types'

interface CartViewProps {
  cart: CartItem[]
  auth: User | null
  submitOrder: (cart: CartItem[]) => void
  removeFromCart: (productId: number) => void
  navigateToLogin: () => void
  successMessage?: string | null
  errorMessage?: string | null
}

export default function CartView({ cart, auth, submitOrder, removeFromCart, navigateToLogin, successMessage, errorMessage }: CartViewProps) {
  return (
    <div id="cart-view" className="container">
      <Hero />
      <br />
      {successMessage && (
        <div className="alert alert-success" role="alert">
          {successMessage}
        </div>
      )}
      {errorMessage && (
        <div className="alert alert-danger" role="alert">
          {errorMessage}
        </div>
      )}
      <div className="row">
        <div className="col-sm-6 col-xs-12">
          {cart.length < 1 ? (
            <CartEmpty />
          ) : (
            cart.map(item => (
              <CartLineItem
                key={item.product.id}
                name={item.product.name}
                quantity={item.quantity}
                photo={item.product.photo}
                description={item.product.description}
                price={item.product.price}
                onRemove={() => removeFromCart(item.product.id)}
              />
            ))
          )}
        </div>
      </div>
      {cart.length > 0 ? (
        <div className="text-center">
          <button
            onClick={evt => {
              evt.preventDefault()
              if (!auth) {
                navigateToLogin()
              } else {
                submitOrder(cart)
              }
            }}
            className="btn btn-success btn-lg"
          >
            {auth ? 'Checkout' : 'Log in to checkout'}
          </button>
        </div>
      ) : (
        ''
      )}
      <br />
    </div>
  )
}
