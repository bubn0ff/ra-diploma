import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import { cartAddItem } from '../actions/actionCreators';
import placeholder from '../img/placeholder.png';
import Product from '../models/Product';

// Добавление товара в корзину (нет доступных размеров - нет поля количества и кнопки "добавить")

export default function ProductItemCard({ item }) {
  const [count, setCount] = useState(1);
  const [size, setSize] = useState(null);
  const dispatch = useDispatch();
  
  const avalibleSizes = item.sizes.filter(({ avalible }) => avalible);
  const samples = avalibleSizes.map(({ size }) => size);
  const sizes = item.sizes ? samples : [];
  const blank = sizes.length === 0;

  const handleIncrement = () => {
    return count >= 10 ? setCount(10) : setCount(count + 1);
  };

  const handleDecrement = () => {
    return count <= 1 ? setCount(1) : setCount(count - 1);
  };

  // Обработчик отправки выбранного товара в корзину
  const handleSubmitToCart = () => {
    const newItem = new Product(item.id, item.title, size, count, item.price);
    dispatch(cartAddItem(newItem));
    dispatch(push('/cart'));
  };

  // Обработчик для товара, если не загружается картинка - ставится заглушка
  const handleErrorPlaceholder = event => {
    event.target.onerror = null;
    event.target.src = placeholder;
  }

  return (
    <div className='row'>
      <div className='col-5'>
        <img 
          src={item.images[0]} 
          className='img-fluid' 
          alt={item.title || 'img-placeholder'} 
          onError={handleErrorPlaceholder} 
        />
      </div>

      <div className='col-7'>
        <table className='table table-bordered'>
          <tbody>
            <tr>
              <td>Артикул</td>
              <td>{item.sku}</td>
            </tr>
            <tr>
              <td>Производитель</td>
              <td>{item.manufacturer}</td>
            </tr>
            <tr>
              <td>Цвет</td>
              <td>{item.color}</td>
            </tr>
            <tr>
              <td>Материалы</td>
              <td>{item.material}</td>
            </tr>
            <tr>
              <td>Сезон</td>
              <td>{item.season}</td>
            </tr>
            <tr>
              <td>Повод</td>
              <td>{item.reason}</td>
            </tr>
          </tbody>
        </table>

        <div className='text-center'>
        <p>Размеры в наличии:
          {sizes.map((item) => (
            <span
              key={item}
              className={item === size ? 'catalog-item-size selected' : 'catalog-item-size'}
              onClick={() => setSize(item)}
            >
              {item}
            </span>
          ))}
        </p>

        {blank ? null : 
          (
            <>
              <p>Количество: 
                <span className='btn-group btn-group-sm pl-2'>
                  <button className='btn btn-secondary' onClick={handleDecrement}>-</button>
                  <span className='btn btn-outline-primary'>{count}</span>
                  <button className='btn btn-secondary' onClick={handleIncrement}>+</button>
                </span>
              </p>

              <button className='btn btn-danger btn-block btn-lg' disabled={!size} onClick={handleSubmitToCart}>В корзину</button>
            </>
          )
        }
      </div>

      </div>
    </div>
  );
}

ProductItemCard.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
    sku: PropTypes.string.isRequired,
    manufacturer: PropTypes.string,
    color: PropTypes.string,
    season: PropTypes.string,
    reason: PropTypes.string,
    material: PropTypes.string,
    sizes: PropTypes.arrayOf(PropTypes.shape({
      size: PropTypes.string.isRequired,
      avalible: PropTypes.bool.isRequired,
    })).isRequired,
  }),
};