import {
  HITS_SALES_FETCH_REQUEST,
  HITS_SALES_FETCH_FAILURE,
  HITS_SALES_FETCH_SUCCESS,
  ITEM_FETCH_REQUEST,
  ITEM_FETCH_FAILURE,
  ITEM_FETCH_SUCCESS,
  CATALOG_INIT,
  CATALOG_FETCH_REQUEST,
  CATALOG_FETCH_FAILURE,
  CATALOG_FETCH_SUCCESS,
  CATALOG_FETCH_CATEGORIES_SUCCESS,
  CATALOG_FETCH_ITEMS_SUCCESS,
  CATALOG_CATEGORY_CHANGE,
  CATALOG_SEARCH_CHANGE,
  CART_SEND_INIT,
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SEND_REQUEST,
  CART_SEND_FAILURE,
  CART_SEND_SUCCESS,
} from './actionTypes';


// ХИТЫ ПРОДАЖ

export const hitsSalesFetchRequest = () => ({
  type: HITS_SALES_FETCH_REQUEST,
});

export const hitsSalesFetchFailure = error => ({
  type: HITS_SALES_FETCH_FAILURE, payload: { error },
});

export const hitsSalesFetchSuccess = items => ({
  type: HITS_SALES_FETCH_SUCCESS, payload: { items },
});


// КАРТОЧКА ТОВАРА

export const itemFetchRequest = id => ({
  type: ITEM_FETCH_REQUEST, payload: { id },
});

export const itemFetchFailure = error => ({
  type: ITEM_FETCH_FAILURE, payload: { error },
});

export const itemFetchSuccess = item => ({
  type: ITEM_FETCH_SUCCESS, payload: { item },
});


// КАТАЛОГ

export const catalogInit = (search = '') => ({
  type: CATALOG_INIT, payload: { search },
});

export const catalogFetchRequest = (append = false) => ({
  type: CATALOG_FETCH_REQUEST, payload: { append },
});

export const catalogFetchFailure = error => ({
  type: CATALOG_FETCH_FAILURE, payload: { error },
});

export const catalogFetchSuccess = () => ({
  type: CATALOG_FETCH_SUCCESS,
});

export const catalogFetchCategoriesSuccess = categories => ({
  type: CATALOG_FETCH_CATEGORIES_SUCCESS, payload: { categories },
});

export const catalogFetchItemsSuccess = (items, append) => ({
  type: CATALOG_FETCH_ITEMS_SUCCESS, payload: { items, append },
});

export const catalogCategoryChange = category => ({
  type: CATALOG_CATEGORY_CHANGE, payload: { category },
});

export const catalogSearchChange = value => ({
  type: CATALOG_SEARCH_CHANGE, payload: { value },
});


// КОРЗИНА

export const cartSendInit = () => ({
  type: CART_SEND_INIT,
});

export const cartAddItem = order => ({
  type: CART_ADD_ITEM, payload: { order },
});

export const cartRemoveItem = id => ({
  type: CART_REMOVE_ITEM, payload: { id },
});

export const cartSendRequest = owner => ({
  type: CART_SEND_REQUEST, payload: { owner },
});

export const cartSendFailure = error => ({
  type: CART_SEND_FAILURE, payload: { error },
});

export const cartSendSuccess = () => ({
  type: CART_SEND_SUCCESS,
});