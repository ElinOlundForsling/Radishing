import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAddress } from '../actions/cartActions';
import Alert from '../components/Alert';
import CheckoutSteps from '../components/CheckoutSteps';

const ShippingScreen = ({ history }) => {
  const cart = useSelector(state => state.cart);
  const { shippingAddress } = cart;
  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postcode, setPostcode] = useState(shippingAddress.postcode);
  const [extra, setExtra] = useState(shippingAddress.extra);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (message) {
      window.setTimeout(() => {
        setMessage('');
      }, 4000);
    }
  }, [message]);

  const dispatch = useDispatch();

  const handleSubmit = e => {
    e.preventDefault();
    if (address && city && postcode) {
      dispatch(saveShippingAddress({ address, city, postcode, extra }));
      history.push('/payment');
    } else {
      setMessage('Fyll i adress, stad och postnummer');
    }
  };
  return (
    <div className='form-container'>
      <div className='form-wrapper'>
        <CheckoutSteps step={3} />
        <h2>Shipping</h2>
        {message && (
          <Alert type='warning' expire={4000}>
            {message}
          </Alert>
        )}
        <form onSubmit={handleSubmit}>
          <input
            type='text'
            name='address'
            value={address}
            placeholder='Enter your address'
            autoComplete='on'
            onChange={e => setAddress(e.target.value)}
          />
          <input
            type='text'
            name='city'
            value={city}
            placeholder='Enter city'
            autoComplete='on'
            onChange={e => setCity(e.target.value)}
          />
          <input
            type='text'
            name='postcode'
            value={postcode}
            placeholder='Enter postcode'
            autoComplete='on'
            onChange={e => setPostcode(e.target.value)}
          />
          <input
            type='text'
            name='extra'
            value={extra}
            placeholder='C/O, lägenhetsnummer ect'
            autoComplete='on'
            onChange={e => setExtra(e.target.value)}
          />
          <button onClick={handleSubmit}>Fortsätt</button>
        </form>
      </div>
    </div>
  );
};

export default ShippingScreen;
