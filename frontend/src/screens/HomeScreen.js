import React from 'react';
import Product from '../components/Product';
import products from '../products';

const HomeScreen = () => {
  return (
    <>
      <h1>Latest Products</h1>
      <section className='card-container'>
        {products.map(product => (
          <article class='card' key={product._id}>
            <Product product={product} />
          </article>
        ))}
      </section>
    </>
  );
};

export default HomeScreen;
