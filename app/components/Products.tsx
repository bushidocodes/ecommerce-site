import React from 'react'
import Product from './Product'
import Hero from './Hero'
import type { Product as ProductType } from '../types'

interface ProductsProps {
  products: ProductType[]
  plusItemzToCart: (product: ProductType, quantity: number) => void
}

export default function Products({ products, plusItemzToCart }: ProductsProps) {
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
