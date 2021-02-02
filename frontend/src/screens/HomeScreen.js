import React, { useState, useEffect } from 'react';
import Product from '../components/Product';
import axios from 'axios';

const HomeScreen = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get('/api/products');

      setProducts(data);
    };
    fetchProducts();
  }, []);

  return (
    <>
      <h1>Latest Products</h1>
      <section className='card-container'>
        {products.map(product => (
          <article className='card' key={product._id}>
            <Product product={product} />
          </article>
        ))}
      </section>
    </>
  );
};

export default HomeScreen;
