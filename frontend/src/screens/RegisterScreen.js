import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Alert from '../components/Alert';
import Spinner from '../components/Spinner';
import { register } from '../actions/userActions';

const RegisterScreen = ({ location, history }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userRegister = useSelector(state => state.userRegister);
  const { loading, error, userInfo } = userRegister;

  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const handleSubmit = e => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
    } else {
      dispatch(register(name, email, password));
    }
  };
  return (
    <div className='form-container'>
      <div className='form-wrapper'>
        <h2>Register</h2>
        {message && (
          <Alert type='warning' expire={4000}>
            {message}
          </Alert>
        )}
        {error && (
          <Alert type='warning' expire={4000}>
            Error: {error}
          </Alert>
        )}
        {loading && <Spinner />}
        <form>
          <label htmlFor='name'>Förnamn och efternamn</label>
          <input
            type='text'
            name='name'
            value={name}
            autoComplete='on'
            onChange={e => setName(e.target.value)}
          />
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            name='email'
            id='email'
            value={email}
            autoComplete='on'
            onChange={e => setEmail(e.target.value)}
          />
          <label htmlFor='password'>Lösenord</label>
          <input
            type='password'
            name='password'
            id='password'
            value={password}
            autoComplete='on'
            onChange={e => setPassword(e.target.value)}
          />
          <label htmlFor='confirm-password'>Bekräfta lösenord</label>
          <input
            type='password'
            name='confirm-password'
            id='confirm-password'
            value={confirmPassword}
            autoComplete='on'
            onChange={e => setConfirmPassword(e.target.value)}
          />
          <button onClick={handleSubmit}>REGISTER NEW USER</button>
        </form>
        <p>
          Already have an account?{' '}
          <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterScreen;
