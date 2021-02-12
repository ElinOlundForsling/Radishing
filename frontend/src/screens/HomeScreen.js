import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Product from '../components/Product';
import { listProducts } from '../actions/productActions';
import Spinner from '../components/Spinner';
import Alert from '../components/Alert';
import Pagination from '../components/Pagination';

const HomeScreen = ({ match }) => {
  const keyword = match.params.keyword;
  const pageNumber = match.params.pageNumber || 1;
  const dispatch = useDispatch();

  const productList = useSelector(state => state.productList);
  const { loading, error, products, page, pages } = productList;

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  return (
    <>
      <h1>{keyword ? 'Search result' : 'Latest Products'}</h1>
      {keyword && products.length === 0 && (
        <p>No products matches your search</p>
      )}
      {loading ? (
        <Spinner />
      ) : error ? (
        <Alert type='warning' expire={0}>
          Error: {error}
        </Alert>
      ) : (
        <div>
          <section className='card-container'>
            {products.map(product => (
              <article className='card' key={product._id}>
                <Product product={product} />
              </article>
            ))}
          </section>
          <Pagination
            page={page}
            pages={pages}
            isAdmin={false}
            keyword={keyword ? keyword : ''}
          />
        </div>
      )}
    </>
  );
};

export default HomeScreen;
