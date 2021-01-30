import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Rating from '../components/Rating';
import products from '../products';

const ProductScreen = ({ match }) => {
  const product = products.find(p => p._id === match.params.id);
  const [amount, setAmount] = useState(1);

  const handleChange = e => {
    if (
      !isNaN(e.target.value) &&
      e.target.value > 0 &&
      e.target.value < product.countInStock
    ) {
      setAmount(Number(e.target.value));
    }
  };

  return (
    <>
      <div className='product-container'>
        <section className='product-image'>
          <img src={product.image} alt={product.name} />
        </section>
        <section className='product-desc'>
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <button
            className='fas fa-plus amount-button'
            onClick={() =>
              setAmount(amount =>
                amount < product.countInStock ? amount + 1 : amount,
              )
            }></button>
          <input
            type='number'
            min='1'
            max={product.countInStock}
            value={amount}
            onChange={handleChange}
          />
          <button
            className='fas fa-minus amount-button'
            onClick={() =>
              setAmount(amount => (amount > 1 ? amount - 1 : amount))
            }></button>
          <button className='cart-button'>Add to cart</button>
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
        </section>
      </div>
      <Link to='/'>Go back</Link>
    </>
  );
};

export default ProductScreen;
