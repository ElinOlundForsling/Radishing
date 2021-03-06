import React, { useEffect } from 'react';
import Alert from '../components/Alert';
import Spinner from '../components/Spinner';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts, deleteProduct } from '../actions/productActions';
import { Link } from 'react-router-dom';
import Pagination from '../components/Pagination';

const ProductListScreen = ({ history, match }) => {
  const pageNumber = match.params.pageNumber || 1;
  const dispatch = useDispatch();

  const productList = useSelector(state => state.productList);
  const { loading, error, products, page, pages } = productList;

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const productDelete = useSelector(state => state.productDelete);
  const { success: successDelete, error: errorDelete } = productDelete;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listProducts('', pageNumber));
    } else {
      history.push('/login');
    }
  }, [dispatch, history, successDelete, userInfo, pageNumber]);

  const handleDelete = id => {
    if (window.confirm('Are you sure?')) {
      dispatch(deleteProduct(id));
    }
  };

  return (
    <>
      <div className='product-header'>
        <h1>Products</h1>
        <Link to='/admin/product/create'>
          <button className='create-product'>Create Product</button>
        </Link>
      </div>
      {loading ? (
        <Spinner />
      ) : error ? (
        <Alert type='warning' expire={0}>
          {error}
        </Alert>
      ) : errorDelete ? (
        <Alert type='warning' expire={0}>
          {errorDelete}
        </Alert>
      ) : (
        <table className='admin-table'>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>PRICE</th>
              <th>CATEGORY</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>${product.price}</td>
                <td>{product.category}</td>
                <td className='admin-icon-buttons'>
                  <Link to={`/admin/product/${product._id}/edit`}>
                    <button className='edit-button'>
                      <i className='fas fa-edit'></i>
                    </button>
                  </Link>
                  <button
                    className='trash-button'
                    onClick={() => handleDelete(product._id)}>
                    <i className='fas fa-trash'></i>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <Pagination page={page} pages={pages} isAdmin={true} keyword='' />
    </>
  );
};

export default ProductListScreen;
