import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { listProductDetails } from '../actions/productActions';
import Rating from '../components/Rating';
import Spinner from '../components/Spinner';
import Alert from '../components/Alert';

const ProductScreen = ({ history, match }) => {
  const [amount, setAmount] = useState(1);
  const dispatch = useDispatch();
  const productDetails = useSelector(state => state.productDetails);
  const { loading, error, product } = productDetails;

  useEffect(() => {
    dispatch(listProductDetails(match.params.id));
  }, [match, dispatch]);

  const handleChange = e => {
    if (
      !isNaN(e.target.value) &&
      e.target.value > 0 &&
      e.target.value < product.countInStock
    ) {
      setAmount(Number(e.target.value));
    }
  };

  const handleAddToCart = () => {
    history.push(`/cart/${match.params.id}?qty=${amount}`);
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : error ? (
        <Alert type='warning' expire={0}>
          Error: {error}
        </Alert>
      ) : (
        <div className='product-container'>
          <section className='product-image'>
            <img src={product.image} alt={product.name} />
          </section>
          <section className='product-desc'>
            <h2>{product.name}</h2>
            <Rating
              value={product.rating || 0}
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
                return (
                  <p className='product-stock'>This product is in stock</p>
                );
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
            <button
              className='cart-button'
              disabled={product.countInStock === 0}
              onClick={handleAddToCart}>
              Add to cart{' '}
              {Math.round((product.price * amount + Number.EPSILON) * 100) /
                100}
            </button>
          </section>
        </div>
      )}
      <Link to='/'>Go back</Link>
    </>
  );
};

export default ProductScreen;
