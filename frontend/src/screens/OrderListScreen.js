import React, { useEffect } from 'react';
import Alert from '../components/Alert';
import Spinner from '../components/Spinner';
import { useDispatch, useSelector } from 'react-redux';
import { listOrders } from '../actions/orderActions';
import { Link } from 'react-router-dom';

const OrderListScreen = ({ history }) => {
  const dispatch = useDispatch();

  const orderList = useSelector(state => state.orderList);
  const { loading, error, orders } = orderList;

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listOrders());
    } else {
      history.push('/login');
    }
  }, [dispatch, history, userInfo]);

  return (
    <>
      <h1>Orders</h1>
      {loading ? (
        <Spinner />
      ) : error ? (
        <Alert type='warning' expire={0}>
          {error}
        </Alert>
      ) : (
        <table className='admin-table'>
          <thead>
            <tr>
              <th>ID</th>
              <th>USER</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user && order.user.name}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>${order.totalPrice}</td>
                <td>
                  {order.isPaid ? (
                    order.paidAt.substring(0, 10)
                  ) : (
                    <i
                      className='fas fa-times'
                      style={{ color: '#b26e63' }}></i>
                  )}
                </td>
                <td>
                  {order.isDelivered ? (
                    order.deliveredAt.substring(0, 10)
                  ) : (
                    <i
                      className='fas fa-times'
                      style={{ color: '#b26e63' }}></i>
                  )}
                </td>
                <td className='admin-icon-buttons'>
                  <Link to={`/order/${order._id}/edit`}>
                    <button className='edit-button'>
                      <i className='fas fa-edit'></i>
                    </button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default OrderListScreen;
