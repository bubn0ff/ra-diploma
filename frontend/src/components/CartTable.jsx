import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { cartRemoveItem } from '../actions/actionCreators';

// Таблица товаров в корзине

export default function CartTable() {
  const { orders } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const total = orders.reduce((sum, { price, count }) => sum + price * count, 0);

  return (
    <section className='cart'>
      <h2 className='text-center'>Корзина</h2>
      <table className='table table-bordered'>
        <thead>
          <tr>
            <th scope='col'>#</th>
            <th scope='col'>Название</th>
            <th scope='col'>Размер</th>
            <th scope='col'>Кол-во</th>
            <th scope='col'>Стоимость</th>
            <th scope='col'>Итого</th>
            <th scope='col'>Действия</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={order.id}>
              <th scope='row'>{index + 1}</th>
              <td><Link to={`/catalog/${order.id}`}>{order.title}</Link></td>
              <td>{order.size}</td>
              <td>{order.count}</td>
              <td>{order.price} руб.</td>
              <td>{order.price * order.count} руб.</td>
              <td><button className='btn btn-outline-danger btn-sm' onClick={() => dispatch(cartRemoveItem(order.id))}>Удалить</button>
              </td>
            </tr>
          ))}

          <tr>
            <td colSpan='5' className='text-right'>Общая стоимость</td>
            <td>{total} руб.</td>
          </tr>
        </tbody>
      </table>
    </section>
  );
}