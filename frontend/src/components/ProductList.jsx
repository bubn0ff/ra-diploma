import React from 'react';
import PropTypes from 'prop-types';
import ProductItem from './ProductItem';

// Список товаров (используется в блоках "Каталог" и "Хит продаж")

export default function ProductList({ items }) {
  const blank = items.length === 0;

  return (
    <>
      {blank ? null : 
        (
          <div className='row'>
            {items.map((item) => (
              <div key={item.id} className='col-4'>
                <ProductItem item={item} />
              </div>
            ))}
          </div>
        )
      }
    </>
  );
}

ProductList.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    })
  ).isRequired,
};

ProductList.defaultProps = {
  items: [],
};