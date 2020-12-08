import React from 'react';
import { Link } from 'react-router-dom';
import Rating from '../components/Rating';
import products from '../products';

const ProductScreen = ({ match }) => {
  const product = products.find(p => p._id === match.params.id);
  return (
    <>
      <Link to='/'>Go back</Link>
    </>
  );
};

export default ProductScreen;
