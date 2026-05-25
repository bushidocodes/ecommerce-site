import React from 'react'
import Nav from './Nav'
import Footer from './Footer'
import Product from './Product'
import Hero from './Hero'

export default function (props) {
  const products = props.products
  const plusItemzToCart = props.plusItemzToCart

  return (
    <div>
      <div className="container">
        <Hero />
        <div className="container">
          <div className="row">
            {products.map((cookie, index) => (
              <Product
                key={index}
                cookie={cookie}
                plusItemzToCart={plusItemzToCart}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
