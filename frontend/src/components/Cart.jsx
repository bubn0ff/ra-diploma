import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { cartSendRequest, cartSendInit } from '../actions/actionCreators';
import RepeatRequestButton from './RepeatRequestButton';
import { CartOrderSuccess, CartOrderEmpty } from './CartStatus';
import Preloader from './Preloader';
import CartTable from './CartTable';
import CartForm from './CartForm';

export default function Cart() {
  const { orders, sending, error, success } = useSelector((state) => state.cart);
  const [owner, setOwner] = useState(null);
  const dispatch = useDispatch();

  // Сброс состояния итога оформления корзины при переходе на страницу (или обновлении)    ???
  useEffect(() => {
    dispatch(cartSendInit());
  }, [dispatch]);

  // Cоздание запроса на оформление заказа при изменении данных покупателя
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

  if (success) {
    content = <CartOrderSuccess />;
  } else if (orders.length === 0) {
    return <CartOrderEmpty />;
  } else if (sending || error) {
    content = (
      <section className='cart'>
        {sending && <Preloader />}
        {error && <RepeatRequestButton error={error} onClick={() => handleSendCart()} />}
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