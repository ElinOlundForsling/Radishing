import React from 'react';
import { Link } from 'react-router-dom';

const CheckoutSteps = ({ step }) => {
  return (
    <div className='checkout-steps'>
      {step >= 1 ? <Link to='/cart'>Cart</Link> : 'Cart'}
      <i className='fas fa-chevron-right'></i>
      {step >= 2 ? <Link to='/login'>Sign In</Link> : 'Sign In'}
      <i className='fas fa-chevron-right'></i>
      {step >= 3 ? <Link to='/shipping'>Shipping</Link> : 'Shipping'}
      <i className='fas fa-chevron-right'></i>
      {step >= 4 ? <Link to='/payment'>Payment</Link> : 'Payment'}
      <i className='fas fa-chevron-right'></i>
      {step >= 5 ? <Link to='/placeorder'>Place Order</Link> : 'Place Order'}
    </div>
  );
};

export default CheckoutSteps;
