import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart, removeFromCart } from '../actions/cartActions';
const CartItem = ({ item }) => {
  const [qty, setQty] = useState(item.qty);

  const dispatch = useDispatch();

  const isFirstRun = useRef(true);
  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    dispatch(addToCart(item.product, qty));
  }, [dispatch, item.product, qty]);

  const handleQtyChange = e => {
    if (
      !isNaN(e.target.value) &&
      e.target.value > 0 &&
      e.target.value < item.countInStock
    ) {
      setQty(Number(e.target.value));
    }
  };

  const handleDelete = () => {
    console.log('delete', item);
    dispatch(removeFromCart(item.product));
  };

  return (
    <>
      <div className='cart-item'>
        <img src={item.image} alt={item.name} />
        <p className='cart-name'>{item.name}</p>
        <p className='cart-price'>{item.price}</p>
        <div className='cart-qty'>
          <button
            className='fas fa-minus amount-button'
            onClick={() => setQty(qty => (qty > 1 ? qty - 1 : qty))}></button>
          <input
            type='number'
            min='1'
            max={item.countInStock}
            value={qty}
            onChange={handleQtyChange}
          />
          <button
            className='fas fa-plus amount-button'
            onClick={() =>
              setQty(qty => (qty < item.countInStock ? qty + 1 : qty))
            }></button>
        </div>
        <span className='cart-item-delete'>
          <button onClick={handleDelete}>
            <i className='fas fa-trash'></i>
          </button>
        </span>
      </div>
      <hr />
    </>
  );
};

export default CartItem;
