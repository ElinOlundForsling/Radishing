import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Alert from '../components/Alert';
import Spinner from '../components/Spinner';
import { getUserDetails, updateUser } from '../actions/userActions';
import { USER_UPDATE_RESET } from '../constants/userConstants';

const UserEditScreen = ({ match, history }) => {
  const userId = match.params.id;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userDetails = useSelector(state => state.userDetails);
  const { loading, error, user } = userDetails;
  const userUpdate = useSelector(state => state.userUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET });
      history.push('/admin/userlist');
    } else {
      if (!user.name || user._id !== userId) {
        dispatch(getUserDetails(userId));
      } else {
        setName(user.name);
        setEmail(user.email);
        setIsAdmin(user.isAdmin);
      }
    }
  }, [user, userId, dispatch, history, successUpdate]);

  const handleSubmit = e => {
    e.preventDefault();
    if (name && email) {
      dispatch(updateUser({ _id: userId, name, email, isAdmin }));
    } else {
      setMessage('Enter a name and an email');
    }
  };
  return (
    <div className='login-container'>
      <div className='login-wrapper'>
        <Link to='/admin/userList'>Go back</Link>
        <h2>Edit User</h2>
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
            type='email'
            name='email'
            value={email}
            placeholder='Email'
            autoComplete='on'
            onChange={e => setEmail(e.target.value)}
          />
          <label class='checker checker--checkbox'>
            Is Admin
            <input
              type='checkbox'
              checked={isAdmin}
              onChange={() => setIsAdmin(isAdmin => !isAdmin)}
            />
            <div class='checker__indicator'></div>
          </label>
          <button onClick={handleSubmit}>UPDATE</button>
        </form>
      </div>
    </div>
  );
};

export default UserEditScreen;
