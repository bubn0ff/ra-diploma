import { STORAGE_CART_ORDERS } from '../actions/actionTypes';

// Сохранение в локальном хранилище списка товаров в корзине (на случай изменения глобального состояния)
export const storageCartMiddleware = store => next => action => {
  const result = next(action);
  const cartOrdersFromStore = JSON.stringify(store.getState().cart.orders);
  localStorage.setItem(STORAGE_CART_ORDERS, cartOrdersFromStore);
  return result;
};

// При изменении глобального состояния - инициализация списка товаров в корзине
export const storageCartInit = () => ({
  orders: JSON.parse(localStorage.getItem(STORAGE_CART_ORDERS)) || [],
});