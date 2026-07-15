import type { Product as ProductType } from '../types';
import Hero from './Hero';
import Product from './Product';

interface ProductsProps {
  products: ProductType[];
  plusItemzToCart: (product: ProductType, quantity: number) => void;
}

export default function Products({ products, plusItemzToCart }: ProductsProps) {
  return (
    <div>
      <div className="container">
        <Hero />
        <div className="container">
          <div className="row">
            {products.map(cookie => (
              <Product
                key={cookie.id}
                cookie={cookie}
                plusItemzToCart={plusItemzToCart}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
