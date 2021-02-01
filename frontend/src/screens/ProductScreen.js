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
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
          <hr />
          <p>{product.description}</p>
          <h5>Price: {product.price}</h5>
          <hr />
          {(() => {
            if (amount === product.countInStock) {
              return <p className='product-stock'>Maximum amount reached</p>;
            } else if (product.countInStock === 0) {
              return <p className='product-stock'>Sold out</p>;
            } else {
              return <p className='product-stock'>This product is in stock</p>;
            }
          })()}
          <button
            disabled={product.countInStock === 0}
            className='fas fa-minus amount-button'
            onClick={() =>
              setAmount(amount => (amount > 1 ? amount - 1 : amount))
            }></button>
          <input
            disabled={product.countInStock === 0}
            type='number'
            min='1'
            max={product.countInStock}
            value={amount}
            onChange={handleChange}
          />
          <button
            className='fas fa-plus amount-button'
            disabled={product.countInStock === 0}
            onClick={() =>
              setAmount(amount =>
                amount < product.countInStock ? amount + 1 : amount,
              )
            }></button>
          <button className='cart-button' disabled={product.countInStock === 0}>
            Add to cart{' '}
            {Math.round((product.price * amount + Number.EPSILON) * 100) / 100}
          </button>
        </section>
      </div>
      <Link to='/'>Go back</Link>
    </>
  );
};

export default ProductScreen;
