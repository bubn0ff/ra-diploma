import React from 'react';
import PropTypes from 'prop-types';
import ProductItem from './ProductItem';

/* Список товаров. Используется в блоках "Каталог" и "Хит продаж" */

export default function ProductList({ items }) {
  if (items.length === 0) {
    return null;
  }

  return (
    <div className='row'>
      {items.map((item) => (
        <div key={item.id} className='col-4'>
          <ProductItem item={item} />
        </div>
      ))}
    </div>
  );
}

ProductList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      category: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      images: PropTypes.arrayOf(PropTypes.string).isRequired,
    })
  ).isRequired,
};

ProductList.defaultProps = {
  items: [],
};