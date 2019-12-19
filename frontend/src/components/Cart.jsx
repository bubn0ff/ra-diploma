import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { cartSendRequest } from '../actions/actionCreators';
import RepeatRequestButton from './RepeatRequestButton';
import { CartOrderSuccess, CartOrderEmpty } from './CartStatus';
import Preloader from './Preloader';
import CartTable from './CartTable';
import CartForm from './CartForm';

export default function Cart() {
  const { orders, sending, error, success } = useSelector((state) => state.cart);
  const [owner, setOwner] = useState(null);
  const dispatch = useDispatch();

  // При изменении данных покупателя создаём запрос на оформление заказа.
  useEffect(() => {
    if (owner) {
      dispatch(cartSendRequest(owner));
    }
  }, [dispatch, owner]);

  // Обработка запроса на оформление заказа с новыми или прежними данными
  const handleSendCart = (newOwner = null) => {
    setOwner((prev) => ( newOwner || { ...prev } ));
  };

  let content = null;

  // продумать новую логику данного блока!!!
  if (success) {
    content = <CartOrderSuccess />;
  } else if (orders.length === 0) {
    return <CartOrderEmpty />;
  } else if (error || sending) {
    content = (
      <section className='cart'>
        {error && <RepeatRequestButton error={error} onClick={() => handleSendCart()} />}
        {sending && <Preloader />}
      </section>
    );
  } else {
    content = (
      <>
        <CartTable />
        <CartForm onSubmit={(newOwner) => handleSendCart(newOwner)} />
      </>
    );
  }

  return content;
}