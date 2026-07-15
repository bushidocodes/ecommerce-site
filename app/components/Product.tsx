import { useRef } from 'react';
import { Link } from 'react-router-dom';
import type { Product as ProductType } from '../types';

interface ProductProps {
  cookie: ProductType;
  plusItemzToCart: (product: ProductType, quantity: number) => void;
}

export default function Product({ cookie, plusItemzToCart }: ProductProps) {
  const quantityRef = useRef<HTMLInputElement>(null);
  return (
    <div className="col-12 col-sm-6 col-md-3">
      <div className="card">
        <div className="cookieContainer">
          <img className="cookieImage" src={cookie.photo} />
        </div>
        <div className="card-body">
          <h4>
            {cookie.name === 'Black & White Cookie' ? (
              <a href="https://www.youtube.com/watch?v=IlLPAIrmqvE">
                {cookie.name}
              </a>
            ) : (
              cookie.name
            )}
          </h4>
          <p>{cookie.description}</p>
          <p className="cookieCategory">
            {cookie.categories.map(category => category).join(', ')}
          </p>
          <p>
            <Link to="/reviews">Reviews</Link>
          </p>
          <p>
            <span id="quantityText">Quantity: </span>
            <input
              ref={quantityRef}
              className="form-control quantity"
              name="quantity"
              defaultValue="1"
            />
            <a
              className="btn btn-info btn-sm"
              role="button"
              onClick={evt => {
                evt.preventDefault();
                const quantity = parseInt(quantityRef.current?.value ?? '1');
                plusItemzToCart(cookie, quantity);
                alert(`Added ${quantity} ${cookie.name} to cart`);
              }}
            >
              Add to cart
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
