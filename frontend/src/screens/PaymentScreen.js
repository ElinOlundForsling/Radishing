import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CheckoutSteps from '../components/CheckoutSteps';
import { savePaymentMethod } from '../actions/cartActions';
import Alert from '../components/Alert';
import useTimeout from '../hooks/useTimeout';

const PaymentScreen = ({ history }) => {
  const cart = useSelector(state => state.cart);
  const { shippingAddress } = cart;

  if (!shippingAddress.address) {
    history.push('/shipping');
  }

  const [paymentMethod, setPaymentMethod] = useState('');
  const [message, setMessage] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    if (message) {
      window.setTimeout(() => {
        setMessage('');
      }, 4000);
    }
  }, [message]);

  const handleSubmit = e => {
    e.preventDefault();
    if (paymentMethod) {
      dispatch(savePaymentMethod(paymentMethod));
      history.push('/placeorder');
    } else {
      setMessage('Välj en betalningsmetod');
    }
  };
  return (
    <div className='login-container'>
      <div className='login-wrapper'>
        <CheckoutSteps step={4} />
        <h2>Payment</h2>
        {message && (
          <Alert color='red' expire={4000}>
            {message}
          </Alert>
        )}
        <label className='radiobutton radiobutton--radio'>
          Betala vid hämtning
          <input
            type='radio'
            name='radio'
            value='Pickup'
            onChange={e => setPaymentMethod(e.target.value)}
          />
          <div className='radiobutton__indicator'></div>
        </label>
        <label className='radiobutton radiobutton--radio'>
          Betala med Paypal
          <input
            type='radio'
            name='radio'
            value='PayPal'
            onChange={e => setPaymentMethod(e.target.value)}
          />
          <div className='radiobutton__indicator'></div>
        </label>
        <label className='radiobutton radiobutton--radio'>
          Betala med kort (kommer snart)
          <input type='radio' name='radio2' disabled='disabled' />
          <div className='radiobutton__indicator'></div>
        </label>
        <form onSubmit={handleSubmit}>
          <button onClick={handleSubmit}>Fortsätt</button>
        </form>
      </div>
    </div>
  );
};

export default PaymentScreen;
