import React from 'react';
import PropTypes from 'prop-types';

// Категории товаров для каталога

export default function Categories({ categories, category, onChange }) {
  const blank = categories.length === 0;
  
  const handleCategoryChange = (event, id) => {
    event.preventDefault();
    onChange(id);
  };

  return (
    <>
      {blank ? null : 
        (
          <ul className='catalog-categories nav justify-content-center'>
            {categories.map((item) => (
              <li className='nav-item' key={item.id}>
                <a 
                  className={item.id === category ? 'nav-link active' : 'nav-link'} 
                  href='/#' 
                  onClick={(event) => handleCategoryChange(event, item.id)}>
                    {item.title}
                </a>
              </li>
            ))}
          </ul>
        )
      }
    </>
  );
}

Categories.propTypes = {
  categories: PropTypes.array.isRequired,
  category: PropTypes.number,
  onChange: PropTypes.func.isRequired,
};