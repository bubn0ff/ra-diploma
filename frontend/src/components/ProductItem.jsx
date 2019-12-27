import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import placeholder from '../img/placeholder.png';

// Карточка открытого товара в каталоге

export default function ProductCardItem({ item }) {
  // Обработчик заглушки для товара, если не загружается картинка
  const handleErrorPlaceholder = event => {
    event.target.onerror = null;
    event.target.src = placeholder;
  }

  return (
    <div className='card'>
      <div className='card-poster'>
        <img
          src={item.images[0]}
          className='card-img-top img-fluid'
          alt={item.title}
          onError={handleErrorPlaceholder}
        />
      </div>

      <div className='card-body'>
        <p className='card-text'>{item.title}</p>
        <p className='card-text'>{item.price} руб.</p>
        <Link to={`catalog/${item.id}`} className='btn btn-outline-primary'>Заказать</Link>
      </div>
    </div>
  );
}

ProductCardItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    category: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};