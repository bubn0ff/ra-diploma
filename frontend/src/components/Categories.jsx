import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { catalogCategoryChange } from '../actions/actionCreators';

export default function Categories() {
  const { categories, category } = useSelector((state) => state.categories);
  const dispatch = useDispatch();

  const handleClick = (event, id) => {
    event.preventDefault();
    dispatch(catalogCategoryChange(id));
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
            href="#" 
            onClick={(event) => handleClick(event, item.id)}>
              {item.title}
          </a>
        </li>
      ))}
    </ul>
  );
}