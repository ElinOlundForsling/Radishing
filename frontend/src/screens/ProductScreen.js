import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  listProductDetails,
  createProductReview,
} from '../actions/productActions';
import Rating from '../components/Rating';
import Rate from '../components/Rate';
import Spinner from '../components/Spinner';
import Alert from '../components/Alert';
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants';

const ProductScreen = ({ history, match }) => {
  const [amount, setAmount] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const dispatch = useDispatch();
  const productDetails = useSelector(state => state.productDetails);
  const { loading, error, product } = productDetails;

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const productReviewCreate = useSelector(state => state.productReviewCreate);
  const {
    success: successProductReview,
    loading: loadingProductReview,
    error: errorProductReview,
  } = productReviewCreate;

  useEffect(() => {
    if (successProductReview) {
      setRating(0);
      setComment('');
    }
    if (!product._id || product._id !== match.params.id) {
      dispatch(listProductDetails(match.params.id));
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }
  }, [dispatch, match, successProductReview, product._id]);

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

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(
      createProductReview(match.params.id, {
        rating,
        comment,
      }),
    );
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
      <section>
        <h3>Recensioner</h3>
        {product.reviews.length === 0 && (
          <Alert type='info' expire={0}>
            Inga recensioner
          </Alert>
        )}
        {product.reviews.map(review => {
          return (
            <div className='review' key={review._id}>
              <strong>
                {review.name} den <i>{review.createdAt.substring(0, 10)}</i>
              </strong>
              <p>{review.comment}</p>
            </div>
          );
        })}
        <hr />
        <h4>Recensera produkten</h4>
        {successProductReview && (
          <Alert type='success'>Review submitted successfully</Alert>
        )}
        {loadingProductReview && <Spinner />}
        {errorProductReview && (
          <Alert type='warning'>{errorProductReview}</Alert>
        )}
        {userInfo ? (
          <div className='form-wrapper'>
            <form onSubmit={handleSubmit}>
              <label>Betyg</label>
              <Rate rating={rating} setRating={setRating} />
              <label htmlFor='comment'>Kommentar</label>
              <textarea
                id='comment'
                row='10'
                value={comment}
                onChange={e => setComment(e.target.value)}
              />
              <button type='submit'>Skicka</button>
            </form>
          </div>
        ) : (
          <Alert type='info'>
            Please <Link to='/login'>sign in</Link> to write a review{' '}
          </Alert>
        )}
      </section>
      <p>
        <Link to='/'>Go back</Link>
      </p>
    </>
  );
};

export default ProductScreen;
