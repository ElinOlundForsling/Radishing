import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAddress } from '../actions/cartActions';

const ShippingScreen = ({ history }) => {
  const cart = useSelector(state => state.cart);
  const { shippingAddress } = cart;
  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postcode, setPostcode] = useState(shippingAddress.postcode);
  const [extra, setExtra] = useState(shippingAddress.extra);

  const dispatch = useDispatch();

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postcode, extra }));
    history.push('/payment');
  };
  return (
    <div className='login-container'>
      <div className='login-wrapper'>
        <h2>Shipping</h2>
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
