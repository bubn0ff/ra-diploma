import React, { useState } from 'react';

// В корзине - блок "Оформление заказа"

export default function CartForm({ onSubmit }) {
  const initialForm = {
    phone: '',
    address: '',
    agreement: false,
  };

  const [form, setForm] = useState(initialForm);

  // Обработчик полей ввода
  const handleInput = event => {
    const name = event.target.id;
    const value = (event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Обработчик отправки заполненной формы
  const handleSubmit = event => {
    event.preventDefault();
    const { phone, address } = form;
    onSubmit({ phone, address }); // возвращаем в Cart из формы телефон и адрес
    setForm(initialForm); // снова устанавливаем начальное состояние формы
  };

  return (
    <section className='order'>
      <h2 className='text-center'>Оформить заказ</h2>
      <div className='card' style={{ maxWidth: '30rem', margin: '0 auto' }}>
        <form className='card-body' onSubmit={handleSubmit}>

          <div className='form-group'>
            <label htmlFor='phone'>Телефон</label>
            <input 
              type='tel'
              className='form-control' 
              id='phone' 
              maxLength='12'
              pattern='^\+7\d{3}\d{7}$'
              placeholder='Ваш телефон в формате +7хххххххххх' 
              value={form.phone} 
              onChange={handleInput} 
            />
          </div>

          <div className='form-group'>
            <label htmlFor='address'>Адрес доставки</label>
            <input 
              type='text'
              className='form-control' 
              id='address' 
              placeholder='Адрес доставки' 
              value={form.address} 
              onChange={handleInput} 
            />
          </div>

          <div className='form-group form-check'>
            <input 
              type='checkbox' 
              className='form-check-input' 
              id='agreement' 
              checked={form.agreement} 
              onChange={handleInput} 
            />
            <label className='form-check-label' htmlFor='agreement'>Согласен с правилами доставки</label>
          </div>

          <button type='submit' className='btn btn-outline-secondary' disabled={!form.phone || !form.address || !form.agreement}>Оформить</button>
        </form>
      </div>
    </section>
  );
}