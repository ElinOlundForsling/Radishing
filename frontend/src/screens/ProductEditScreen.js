import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Alert from '../components/Alert';
import Spinner from '../components/Spinner';
import { listProductDetails, updateProduct } from '../actions/productActions';
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants';

const ProductEditScreen = ({ match, history }) => {
  const productId = match.params.id;

  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState('');
  const [message, setMessage] = useState('');

  const dispatch = useDispatch();

  const productDetails = useSelector(state => state.productDetails);
  const { loading, error, product } = productDetails;

  const productUpdate = useSelector(state => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      history.push('/admin/productlist');
    } else {
      if (!product.name || product._id !== productId) {
        dispatch(listProductDetails(productId));
      } else {
        setName(product.name);
        setPrice(product.price);
        setImage(product.image);
        setCategory(product.category);
        setCountInStock(product.countInStock);
        setDescription(product.description);
      }
    }
  }, [dispatch, history, productId, product, successUpdate]);

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(
      updateProduct({
        _id: productId,
        name,
        price,
        image,
        category,
        description,
        countInStock,
      }),
    );
  };

  return (
    <div className='login-container'>
      <div className='login-wrapper'>
        <Link to='/admin/productList'>Go back</Link>
        <h2>Edit Product</h2>
        {message && (
          <Alert color='red' expire={4000}>
            {message}
          </Alert>
        )}
        {error && (
          <Alert color='red' expire={4000}>
            Error: {error}
          </Alert>
        )}
        {loading && <Spinner />}
        <form>
          <input
            type='text'
            name='name'
            value={name}
            placeholder='Name'
            autoComplete='on'
            onChange={e => setName(e.target.value)}
          />
          <input
            type='number'
            name='price'
            value={price}
            placeholder='Price'
            autoComplete='on'
            onChange={e => setPrice(e.target.value)}
          />
          <input
            type='text'
            name='image'
            value={image}
            placeholder='Image'
            autoComplete='on'
            onChange={e => setImage(e.target.value)}
          />
          <input
            type='text'
            name='category'
            value={category}
            placeholder='Category'
            autoComplete='on'
            onChange={e => setCategory(e.target.value)}
          />
          <input
            type='text'
            name='description'
            value={description}
            placeholder='Description'
            autoComplete='on'
            onChange={e => setDescription(e.target.value)}
          />
          <input
            type='number'
            name='countInStock'
            value={countInStock}
            placeholder='In stock'
            autoComplete='on'
            onChange={e => setCountInStock(e.target.value)}
          />

          <button onClick={handleSubmit}>UPDATE</button>
        </form>
      </div>
    </div>
  );
};

export default ProductEditScreen;
