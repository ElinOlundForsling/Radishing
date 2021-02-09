import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CheckoutSteps from '../components/CheckoutSteps';
import Alert from '../components/Alert';
import { createOrder } from '../actions/orderActions';

const PlaceOrderScreen = ({ history }) => {
  const cart = useSelector(state => state.cart);

  if (!cart.shippingAddress.address) {
    history.push('/shipping');
  } else if (!cart.paymentMethod) {
    history.push('/payment');
  }

  const [message, setMessage] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    if (message) {
      window.setTimeout(() => {
        setMessage('');
      }, 4000);
    }
  }, [message]);

  const addDecimals = num => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  cart.itemsPrice = addDecimals(
    Number(
      cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0),
    ),
  );

  cart.shippingPrice = addDecimals(140);

  cart.taxPrice = addDecimals(Number(0.25 * cart.itemsPrice));

  cart.totalPrice = (
    Number(cart.itemsPrice) + Number(cart.shippingPrice)
  ).toFixed(2);

  const orderCreate = useSelector(state => state.orderCreate);
  const { order, success, error } = orderCreate;

  useEffect(() => {
    if (success) {
      history.push(`/order${order._id}`);
    }
  }, [history, success, order]);

  const placeOrder = e => {
    e.preventDefault();
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      }),
    );
  };

  return (
    <div className='place-order'>
      <div className='checkout-wrapper'>
        <CheckoutSteps step={5} />
        <h2>Place Order</h2>
        {error && (
          <Alert color='red' expire={4000}>
            {error}
          </Alert>
        )}
      </div>
      <div className='cart-container'>
        <section className='cart-list'>
          {message && (
            <Alert color='red' expire={4000}>
              {message}
            </Alert>
          )}
          <article>
            <h4>Adress</h4>
            {cart.shippingAddress.address}, {cart.shippingAddress.postcode}{' '}
            {cart.shippingAddress.city} {cart.shippingAddress.extra}
            <hr />
          </article>
          <article>
            <h4>Betalning</h4>
            <b>Betalningsmetod:</b> {cart.paymentMethod}
            <hr />
          </article>
          <article>
            <h4>Beställning</h4>
            {cart.cartItems.map(item => {
              return (
                <div className='place-order-product' key={item.product}>
                  <span>
                    <img src={item.image} alt={item.name} />
                    <h6>{item.name}</h6>
                  </span>
                  <span>
                    {item.qty} x {item.price}kr ={' '}
                    {(item.qty * item.price).toFixed(2)}kr
                  </span>
                </div>
              );
            })}
            <hr />
          </article>
        </section>
        <section className='cart-checkout'>
          <h4>Sammanfattning</h4>
          <table className='checkout-table'>
            <tbody>
              <tr>
                <th>Pris</th>
                <td>{cart.itemsPrice}kr</td>
              </tr>
              <tr>
                <th>Moms</th>
                <td>{cart.taxPrice}kr</td>
              </tr>
              <tr>
                <th>Frakt</th>
                <td>{cart.shippingPrice}kr</td>
              </tr>
              <tr>
                <th>Totalt</th>
                <td>{cart.totalPrice}kr</td>
              </tr>
              <tr>
                <td colSpan='2'>
                  <button onClick={placeOrder}>Check out</button>
                </td>
              </tr>
            </tbody>
          </table>
        </section>
      </div>
    </div>
  );
};

export default PlaceOrderScreen;
