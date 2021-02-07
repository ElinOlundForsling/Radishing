import React from 'react';
import { Link } from 'react-router-dom';
import Rating from './Rating';

const Product = ({ product }) => {
  return (
    <>
      <Link to={`products/${product._id}`}>
        <picture className='thumbnail'>
          <img src={product.image} alt='Chocolate filled boller' />
        </picture>
        <div className='card-content'>
          <h2>{product.name}</h2>
          <span className='card-price'>{product.price}</span>
          <div className='rating-container'>
            <Rating
              value={product.rating}
              text={`${product.numReviews} reviews`}
            />
          </div>
        </div>
      </Link>
    </>
  );
};

export default Product;
