import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { itemFetchRequest } from '../actions/actionCreators';
import Preloader from './Preloader';
import RepeatRequestButton from './RepeatRequestButton';
import ProductItemCard from './ProductItemCard';

// Карточка товара в каталоге

export default function Product({ match }) {
  const { item, loading, error } = useSelector((state) => state.product);
  const id = parseInt(match.params.id, 10);
  const dispatch = useDispatch();

  // Перезагрузка товара при его изменении
  useEffect(() => {
    dispatch(itemFetchRequest(id));
  }, [dispatch, id]);

  return (
    <section className='catalog-item'>
      <h2 className='text-center'>{item ? item.title : ''}</h2>
      {error && <RepeatRequestButton error={error} onClick={() => dispatch(itemFetchRequest(id))} />}
      {loading && <Preloader />}
      {item && <ProductItemCard item={item} />}
    </section>
  );
}