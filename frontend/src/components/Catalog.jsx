import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { catalogInit, catalogFetchRequest, catalogSearchChange } from '../actions/actionCreators';
import Preloader from './Preloader';
import ProductList from './ProductList';
import RepeatRequestButton from './RepeatRequestButton';
import Categories from './Categories';

export default function Catalog({ showSearch }) {
  const { items, loading, error, more, search } = useSelector((state) => state.catalog);
  const dispatch = useDispatch();

  // Сброс глобального состояния при обновлении поискового запроса/переходе на страницу каталога.
  // Одновременно устанавливаем строку поиска (если есть).
  useEffect(() => {
    dispatch(catalogInit(showSearch));
  }, [dispatch, showSearch]);

  // Запускаем процесс загрузки данных (сначала список категорий, потом список товаров в категории).
  useEffect(() => {
    dispatch(catalogFetchRequest(false));
  }, [dispatch]);

  // Обработчик кнопок - кнопка повторного запроса (если не удалось загрузить данные) и кнопка "Загрузить ещё"
  const handleReload = () => {
    dispatch(catalogFetchRequest(true));
  };

  // Обработчик строки поиска в каталоге
  const handleInput = event => {
    const { value } = event.target;
    dispatch(catalogSearchChange(value));
  };

  return (
    <section className='catalog'>
      <h2 className='text-center'>Каталог</h2>

      {showSearch && (
        <form className='catalog-search-form form-inline'>
          <input className='form-control' placeholder="Поиск" value={search} onChange={handleInput} />
        </form>
      )}

      <Categories />
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
  showSearch: PropTypes.bool.isRequired, // нет переменной showSearch - нет поиска
};

Catalog.defaultProps = {
  showSearch: false,
};