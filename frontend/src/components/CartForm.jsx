import React, { useState } from 'react';
import PropTypes from 'prop-types';

// В корзине - блок "Оформление заказа"

export default function CartForm({ onSubmit }) {
  const initialForm = {
    phone: '',
    address: '',
    agreement: false,
  };

  const [cartForm, setCartForm] = useState(initialForm);
  const cardStyle = { maxWidth: '25rem', margin: '0 auto' };

  // Обработчик полей ввода
  const handleInput = event => {
    const name = event.target.id;
    const value = (event.target.type === 'checkbox' ? event.target.checked : event.target.value);
    setCartForm((prev) => ({ ...prev, [name]: value }));
  };

  // Обработчик отправки заполненной формы
  const handleSubmit = event => {
    event.preventDefault();
    const { phone, address } = cartForm;
    onSubmit({ phone, address });
    setCartForm(initialForm);
  };

  return (
    <section className='order'>
      <h2 className='text-center'>Оформить заказ</h2>
      <div className='card' style={cardStyle}>
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
              value={cartForm.phone} 
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
              value={cartForm.address} 
              onChange={handleInput} 
            />
          </div>

          <div className='form-group form-check'>
            <input 
              type='checkbox' 
              className='form-check-input' 
              id='agreement' 
              checked={cartForm.agreement} 
              onChange={handleInput} 
            />
            <label className='form-check-label' htmlFor='agreement'>Согласен с правилами доставки</label>
          </div>

          <button 
            type='submit' 
            className='btn btn-outline-secondary' 
            disabled={!cartForm.phone || !cartForm.address || !cartForm.agreement}
          >
            Оформить
          </button>
        </form>
      </div>
    </section>
  );
}

CartForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}