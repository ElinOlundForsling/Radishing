import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Product from '../components/Product';
import { listProducts } from '../actions/productActions';
import Spinner from '../components/Spinner';
import Alert from '../components/Alert';

const HomeScreen = () => {
  const dispatch = useDispatch();

  const productList = useSelector(state => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  return (
    <>
      <h1>Latest Products</h1>
      {loading ? (
        <Spinner />
      ) : error ? (
        <Alert color='red' expire={0}>
          Error: {error}
        </Alert>
      ) : (
        <section className='card-container'>
          {products.map(product => (
            <article className='card' key={product._id}>
              <Product product={product} />
            </article>
          ))}
        </section>
      )}
    </>
  );
};

export default HomeScreen;
