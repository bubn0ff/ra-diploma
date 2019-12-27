import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { catalogInit, catalogFetchRequest, catalogSearchChange, catalogCategoryChange } from '../actions/actionCreators';
import Preloader from './Preloader';
import ProductList from './ProductList';
import RepeatRequestButton from './RepeatRequestButton';
import Categories from './Categories';
import { getUrl } from '../api/apiHeader';
import { push } from 'connected-react-router';
import apiSearchValue from '../api/apiSearchValue';

// Каталог (нет showSearch - нет поля поиска в каталоге)

export default function Catalog({ showSearch }) {
  const { items, categories, category, loading, error, more, search } = useSelector((state) => state.catalog);
  const isShowSearch = apiSearchValue(showSearch ? 'q' : null);
  const dispatch = useDispatch();
  
  // Сброс глобального состояния
  useEffect(() => {
    dispatch(catalogInit(isShowSearch));
  }, [dispatch, isShowSearch]);

  // Запуск процесса загрузки данных (список категорий, список товаров в категории).
  useEffect(() => {
    dispatch(catalogFetchRequest(false));
  }, [dispatch, isShowSearch]);

  // Обработчик кнопки повторного запроса (если не удалось загрузить данные, она же "Загрузить ещё")
  const handleReload = () => {
    dispatch(catalogFetchRequest(true));
  };

  // Обработчик строки поиска в каталоге
  const handleInput = event => {
    const { value } = event.target;
    dispatch(catalogSearchChange(value));
  };

   // Обработчик формы поиска в каталоге, когда там что-то есть
   const handleSearchFormSubmit = event => {
    event.preventDefault();
    const url = getUrl('/catalog', search);
    dispatch(push(url));
  }

  // Обработчик изменения категории
  const handleClick = id => {
    dispatch(catalogCategoryChange(id));
  };

  return (
    <section className='catalog'>
      <h2 className='text-center'>Каталог</h2>

      {showSearch && 
        (
          <form className='catalog-search-form form-inline' onSubmit={handleSearchFormSubmit}>
            <input className='form-control' placeholder='Поиск' value={search || ''} onChange={handleInput} />
          </form>
        )
      }

      <Categories categories={categories} category={category} onChange={handleClick} />
      <ProductList items={items} />

      {error && <RepeatRequestButton error={error} onClick={handleReload} />}
      {loading && <Preloader />}

      {!error && !loading && (
        <>
          {!items.length && <p className='text-center text-muted'>Ничего не найдено</p>}
          {more && (
            <div className='text-center'>
              <button className="btn btn-outline-primary" onClick={handleReload}>Загрузить ещё</button>
            </div>
          )}
        </>
      )}
    </section>
  );
}

Catalog.propTypes = {
  showSearch: PropTypes.bool.isRequired,
};

Catalog.defaultProps = {
  showSearch: false,
};