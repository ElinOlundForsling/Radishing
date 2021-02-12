import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { PayPalButton } from 'react-paypal-button-v2';
import { useDispatch, useSelector } from 'react-redux';
import Alert from '../components/Alert';
import Spinner from '../components/Spinner';
import {
  getOrderDetails,
  payOrder,
  deliverOrder,
} from '../actions/orderActions';
import {
  ORDER_PAY_RESET,
  ORDER_DELIVER_RESET,
} from '../constants/orderConstants';

const OrderScreen = ({ match, history }) => {
  const orderId = match.params.id;

  const [sdkReady, setSdkReady] = useState(false);
  const [message, setMessage] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    if (message) {
      window.setTimeout(() => {
        setMessage('');
      }, 4000);
    }
  }, [message]);

  const orderDetails = useSelector(state => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const orderPay = useSelector(state => state.orderPay);
  const {
    loading: loadingPay,
    success: successPay,
    error: errorPay,
  } = orderPay;

  const orderDeliver = useSelector(state => state.orderDeliver);
  const {
    loading: loadingDeliver,
    success: successDeliver,
    error: errorDeliver,
  } = orderDeliver;

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  if (!loading) {
    const addDecimals = num => {
      return (Math.round(num * 100) / 100).toFixed(2);
    };

    order.itemsPrice = addDecimals(
      order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0),
    );
  }

  useEffect(() => {
    if (!userInfo) {
      history.push('/login');
    }
    const addPayPalScript = async () => {
      const { data: clientId } = await axios.get('/api/config/paypal');
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };

    if (!order || successPay || successDeliver || order._id !== orderId) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_DELIVER_RESET });
      dispatch(getOrderDetails(orderId));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPayPalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [dispatch, successPay, successDeliver, order, orderId, history, userInfo]);

  const handleSuccess = paymentResult => {
    console.log(paymentResult);
    dispatch(payOrder(orderId, paymentResult));
  };

  const handleDeliver = () => {
    dispatch(deliverOrder(order));
  };

  return (
    <>
      {loadingDeliver && <Spinner />}
      {errorDeliver && (
        <Alert type='warning' expire={4000}>
          {errorDeliver}
        </Alert>
      )}
      {loadingPay && <Spinner />}
      {errorPay && (
        <Alert type='warning' expire={4000}>
          {errorPay}
        </Alert>
      )}
      {loading ? (
        <Spinner />
      ) : error ? (
        <Alert type='warning' expire={0}>
          {error}
        </Alert>
      ) : (
        <div className='place-order'>
          <div className='checkout-wrapper'>
            <h2>Order {order._id}</h2>
            {error && (
              <Alert type='warning' expire={4000}>
                {error}
              </Alert>
            )}
          </div>
          <div className='cart-container'>
            <section className='cart-list'>
              {message && (
                <Alert type='warning' expire={4000}>
                  {message}
                </Alert>
              )}
              <article>
                <h4>Adress</h4>
                {order.shippingAddress.address},{' '}
                {order.shippingAddress.postcode} {order.shippingAddress.city}{' '}
                {order.shippingAddress.extra}
                {order.isDelivered ? (
                  <Alert type='success' expire={0}>
                    Skickad
                  </Alert>
                ) : (
                  <Alert type='warning' expire={0}>
                    Inte skickad
                  </Alert>
                )}
                <hr />
              </article>
              <article>
                <h4>Betalning</h4>
                <b>Betalningsmetod:</b> {order.paymentMethod}
                {order.isPaid ? (
                  <Alert type='success' expire={0}>
                    Betalad den {order.paidAt}
                  </Alert>
                ) : (
                  <Alert type='warning' expire={0}>
                    Inte betalad
                  </Alert>
                )}
                <hr />
              </article>
              <article>
                <h4>Beställning</h4>
                {order.orderItems.map(item => {
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
                    <td>{order.itemsPrice}kr</td>
                  </tr>
                  <tr>
                    <th>Moms</th>
                    <td>{order.taxPrice}kr</td>
                  </tr>
                  <tr>
                    <th>Frakt</th>
                    <td>{order.shippingPrice}kr</td>
                  </tr>
                  <tr>
                    <th>Totalt</th>
                    <td>{order.totalPrice}kr</td>
                  </tr>
                  {order.user._id === userInfo._id && !order.isPaid && (
                    <tr>
                      <td colSpan='2'>
                        {loadingPay && <Spinner />}
                        {!sdkReady ? (
                          <Spinner />
                        ) : (
                          <PayPalButton
                            amount={order.totalPrice}
                            onSuccess={handleSuccess}
                          />
                        )}
                      </td>
                    </tr>
                  )}
                  {userInfo &&
                    userInfo.isAdmin &&
                    order.isPaid &&
                    !order.isDelivered && (
                      <div>
                        <button type='button' onClick={handleDeliver}>
                          Mark As Delivered
                        </button>
                      </div>
                    )}
                </tbody>
              </table>
            </section>
          </div>
        </div>
      )}
    </>
  );
};

export default OrderScreen;
