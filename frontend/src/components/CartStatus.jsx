import React from 'react';

export function CartOrderSuccess() {
  return (
    <section className='order'>
      <h2 className='text-center'>Заказ успешно оформлен.</h2>
      <p className='text-center'>Наш менеджер свяжется с Вами в ближайшее время.</p>
    </section>
  )
}

export function CartOrderEmpty() {
  return (
    <section className='cart'>
      <h2 className='text-center'>Корзина</h2>
      <p className='text-center'>Корзина пуста. Выберите что-нибудь из каталога.</p>
    </section>
  );
}