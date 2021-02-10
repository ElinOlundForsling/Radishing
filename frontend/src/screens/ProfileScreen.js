import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Alert from '../components/Alert';
import Spinner from '../components/Spinner';
import { getUserDetails, updateUserProfile } from '../actions/userActions';
import { listMyOrders } from '../actions/orderActions';
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants';
import { Link } from 'react-router-dom';

const ProfileScreen = ({ history }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);
  const [updateMessage, setUpdateMessage] = useState(null);

  const dispatch = useDispatch();

  const userDetails = useSelector(state => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector(state => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  const orderListMy = useSelector(state => state.orderListMy);
  const { loading: loadingOrders, error: errorOrders, orders } = orderListMy;

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    } else {
      if (success) {
        setUpdateMessage('Profile updated');
      }
      if (!user || !user.name || success) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET });
        dispatch(getUserDetails('profile'));
        dispatch(listMyOrders());
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [dispatch, history, userInfo, user, success]);

  const handleSubmit = e => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
    } else {
      dispatch(updateUserProfile({ _id: user._id, name, email, password }));
    }
  };
  return (
    <div className='profile-container'>
      <section className='profile-update'>
        <h2>Update Profile</h2>
        <form>
          {message && (
            <Alert color='red' expire={4000}>
              {message}
            </Alert>
          )}
          {updateMessage && (
            <Alert color='green' expire={4000}>
              Profile Updated
            </Alert>
          )}
          {error && (
            <Alert color='red' expire={4000}>
              Error: {error}
            </Alert>
          )}
          {loading && <Spinner />}

          <input
            type='text'
            name='name'
            value={name}
            autoComplete='on'
            onChange={e => setName(e.target.value)}
          />
          <input
            type='email'
            name='email'
            value={email}
            autoComplete='on'
            onChange={e => setEmail(e.target.value)}
          />
          <input
            type='password'
            name='password'
            value={password}
            placeholder='New password'
            autoComplete='on'
            onChange={e => setPassword(e.target.value)}
          />
          <input
            type='password'
            name='confirm-password'
            value={confirmPassword}
            placeholder='Confirm new password'
            autoComplete='on'
            onChange={e => setConfirmPassword(e.target.value)}
          />
          <button onClick={handleSubmit}>UPDATE PROFILE</button>
        </form>
      </section>
      <section className='profile-orders'>
        <h2>Orders</h2>
        {loadingOrders ? (
          <Spinner />
        ) : errorOrders ? (
          <Alert color='red' expire={0}>
            {errorOrders}
          </Alert>
        ) : (
          <table className='order-table'>
            <thead>
              <tr>
                <th>ID</th>
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
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>{order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      order.deliveredAt.substring(0, 10)
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                    <Link to={`/order/${order._id}`}>
                      <button variant='light'>Details</button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
};

export default ProfileScreen;
