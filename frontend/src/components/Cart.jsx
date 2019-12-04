import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom'; // ??? проверить актуальность ???
import { cartSendRequest, cartSendInit } from '../actions/actionCreators';
import RepeatRequestButton from './RepeatRequestButton';
import { CartOrderSuccess, CartEmpty } from './CartStatus';
import Preloader from './Preloader';
import CartTable from './CartTable';
import CartForm from './CartForm';

export default function Cart() {
  const { orders, sending, error, success } = useSelector((state) => state.cart);
  const [user, setUser] = useState(null);
  const location = useLocation();
  const dispatch = useDispatch();

  // Сброс состояния итога офомления корзины при переходе на страницу (или обновлении).
  useEffect(() => {
    dispatch(cartSendInit());
  }, [dispatch, location.key]);

  // При изменении данных покупателя создаём запрос на оформление заказа.
  useEffect(() => {
    if (user) {
      dispatch(cartSendRequest(user));
    }
  }, [dispatch, user]);

  // Обработка запроса на оформление заказа с новыми или прежними данными
  const handleSendCart = (newUser = null) => {
    setUser((prev) => ( newUser || { ...prev } ));
  };

  let content = null;

  // продумать новую логику данного блока!!!
  if (success) {
    content = <CartOrderSuccess />;
  } else if (orders.length === 0) {
    return <CartEmpty />;
  } else if (error || sending) {
    content = (
      <section class='cart'>
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