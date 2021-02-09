import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Alert from '../components/Alert';
import { addToCart } from '../actions/cartActions';
import CartItem from '../components/CartItem';

const CartScreen = ({ match, location, history }) => {
  const productId = match.params.id;
  const qty = location.search ? Number(location.search.split('=')[1]) : 1;
  const dispatch = useDispatch();

  const cart = useSelector(state => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const handleCheckout = () => {
    history.push('/login?redirect=shipping');
  };

  return (
    <div className='cart-container'>
      <section className='cart-list'>
        {cartItems.length < 1 ? (
          <Alert color='yellow' expire={0}>
            No items in cart. &nbsp;<Link to='/'>Go back</Link>
          </Alert>
        ) : (
          cartItems.map(item => {
            return <CartItem key={item.product} item={item} />;
          })
        )}
      </section>
      <section className='cart-checkout'>
        <h2>
          Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items:
        </h2>
        <p>
          {cartItems
            .reduce((acc, item) => acc + item.qty * item.price, 0)
            .toFixed(2)}
          kr
        </p>
        <button onClick={handleCheckout}>Check out</button>
      </section>
    </div>
  );
};

export default CartScreen;
