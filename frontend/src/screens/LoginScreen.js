import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Alert from '../components/Alert';
import Spinner from '../components/Spinner';
import { login } from '../actions/userActions';

const LoginScreen = ({ location, history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const userLogin = useSelector(state => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(login(email, password));
  };
  return (
    <div className='login-container'>
      <div className='login-wrapper'>
        <h2>Sign in</h2>
        {error && (
          <Alert type='warning' expire={4000}>
            Error: {error}
          </Alert>
        )}
        {loading && <Spinner />}
        <form>
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
            autoComplete='on'
            onChange={e => setPassword(e.target.value)}
          />
          <button onClick={handleSubmit}>SIGN IN</button>
        </form>
        <p>
          New customer?{' '}
          <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginScreen;
