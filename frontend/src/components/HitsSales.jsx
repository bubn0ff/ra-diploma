import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { hitsSalesFetchRequest } from '../actions/actionCreators';
import RepeatRequestButton from './RepeatRequestButton';
import Preloader from './Preloader';
import ProductList from './ProductList';

export default function HitsSales() {
  const { items, loading, error } = useSelector((state) => state.hitsSales);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(hitsSalesFetchRequest());
  }, [dispatch]);

  if (!loading && !error && items.length === 0) {
    return null;
  }

  return (
    <section className="top-sales">
      <h2 className="text-center">Хиты продаж!</h2>
      
      {loading && <Preloader />}
      {error && <RepeatRequestButton error={error} onClick={() => dispatch(hitsSalesFetchRequest())} />}
      {items && <ProductList items={items} />}
    </section>
  );
}