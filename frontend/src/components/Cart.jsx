import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';                   // ??? проверить актуальность ???
import { cartSendRequest, cartSendInit } from '../actions/actionCreators';
import RepeatRequestButton from './RepeatRequestButton';
import { CartOrderSuccess, CartEmpty } from './CartStatus';
import Preloader from './Preloader';
import CartTable from './CartTable';
import CartForm from './CartForm';

export default function Cart() {
  const { orders, sending, error, success } = useSelector((state) => state.cart);
  const [owner, setOwner] = useState(null);
  const location = useLocation();
  const dispatch = useDispatch();

  // Сброс состояния итога оформления корзины при переходе на страницу (или обновлении).
  useEffect(() => {
    dispatch(cartSendInit());
  }, [dispatch, location.key]);

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
    content = <CartOrderSuccess />; // НЕ РАБОТАЕТ! НАДО РАЗОБРАТЬСЯ!
  } else if (orders.length === 0) {
    return <CartEmpty />;
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
        <CartForm onSubmit={(newUser) => handleSendCart(newUser)} />
      </>
    );
  }

  return content;
}