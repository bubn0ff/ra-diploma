import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';
import { getUrl } from '../api/apiHeader';

// Поиск и корзина в шапке (функционал)

export default function HeaderSearchCart() {
  const [showSearch, setShowSearch] = useState(false);
  const [searchForm, setSearchForm] = useState('');
  const { orders } = useSelector((state) => state.cart);
  const searchInput = useRef(null);
  const dispatch = useDispatch();

  // Установить фокус при появлении поля поиска
  useEffect(() => {
    if (showSearch) {
      searchInput.current.focus();
    }
  }, [showSearch]);

  // Обработчик клика на значок корзины в шапке
  const handleCartClick = () => {
    dispatch(push('/cart'));
  };

  // Обработчик поля ввода в строке поиска
  const handleSearch = event => {
    const { value } = event.target;
    setSearchForm(value);
  };

  // Обработчик формы поиска в шапке, когда там что-то есть
  const handleSearchClick = () => {
    const url = getUrl('/catalog', searchForm);

    if (searchForm.trim() !== '') {
      dispatch(push(url));         // ****     НЕ РАБОТАЕТ, ПРОДУМАТЬ НОВУЮ ЛОГИКУ !!!     ****
    }

    setShowSearch(prev => !prev);
    setSearchForm('');
  };

  // Обработчик отправки формы поиска в шапке
  const handleSearchSubmit = event => {
    event.preventDefault();
    handleSearchClick();
  };

  return (
    <div>
      <div className='header-controls-pics'>
        <div data-id='search-expander' className='header-controls-pic header-controls-search' onClick={handleSearchClick}></div>
        <div className='header-controls-pic header-controls-cart' onClick={handleCartClick}>
          {!!orders.length && <div className='header-controls-cart-full'>{orders.length}</div>}
          <div className='header-controls-cart-menu'></div>
        </div>
      </div>

      <form
        data-id='search-form'
        className={ !showSearch ? 'header-controls-search-form form-inline invisible' : 'header-controls-search-form form-inline'}
        onSubmit={handleSearchSubmit}
      >
        <input
          ref={searchInput}
          className='form-control'
          placeholder='Поиск'
          value={searchForm}
          onChange={handleSearch}
        />
      </form>
    </div>
  );
}