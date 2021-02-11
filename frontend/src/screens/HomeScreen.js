import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Product from '../components/Product';
import { listProducts } from '../actions/productActions';
import Spinner from '../components/Spinner';
import Alert from '../components/Alert';

const HomeScreen = ({ match }) => {
  const keyword = match.params.keyword;
  const dispatch = useDispatch();

  const productList = useSelector(state => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProducts(keyword));
  }, [dispatch, keyword]);

  return (
    <>
      <h1>{keyword ? 'Search result' : 'Latest Products'}</h1>
      {keyword && products.length === 0 && (
        <p>No products matches your search</p>
      )}
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
