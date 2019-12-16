import React from 'react';
import PropTypes from 'prop-types';

export default function Categories({ categories, category, onChange }) {
  const handleCategoryChange = (event, id) => {
    event.preventDefault();
    onChange(id);
  };

  if (categories.length === 0) {
    return null;
  }

  return (
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
  );
}

Categories.propTypes = {
  categories: PropTypes.array.isRequired,
  category: PropTypes.number,
};