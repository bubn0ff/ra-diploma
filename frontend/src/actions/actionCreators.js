import {
  HITS_SALES_FETCH_REQUEST,
  HITS_SALES_FETCH_FAILURE,
  HITS_SALES_FETCH_SUCCESS,
  ITEM_FETCH_REQUEST,
  ITEM_FETCH_FAILURE,
  ITEM_FETCH_SUCCESS,
} from './actionTypes';


// ХИТЫ ПРОДАЖ

export const hitsSalesFetchRequest = () => ({
  type: HITS_SALES_FETCH_REQUEST,
});

export const hitsSalesFetchFailture = error => ({
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