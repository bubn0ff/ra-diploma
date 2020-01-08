import { take, takeLatest, put, call, select, race, spawn } from 'redux-saga/effects';
import Api from '../api/index';
import { 
  HITS_SALES_FETCH_REQUEST,
  ITEM_FETCH_REQUEST,
  CATALOG_CATEGORY_CHANGE,
  CATALOG_FETCH_REQUEST,
  CART_SEND_REQUEST,
} from '../actions/actionTypes';
import { 
  hitsSalesFetchFailure, 
  hitsSalesFetchSuccess,
  itemFetchFailure,
  itemFetchSuccess,
  catalogFetchRequest,
  catalogFetchFailure,
  catalogFetchCategoriesSuccess,
  catalogFetchItemsSuccess,
  catalogFetchSuccess,
  cartSendFailure,
  cartSendSuccess,
} from '../actions/actionCreators';
import { LOCATION_CHANGE } from 'connected-react-router';


// WORKERS //

function* handleHitsSalesFetchSaga() {
  try {
    const data = yield call(Api.fetchHitsSales);
    yield put(hitsSalesFetchSuccess(data));
  } catch (error) {
    yield put(hitsSalesFetchFailure(error.message));
  }
}

function* handleItemFetchSaga(action) {
  try {
    const data = yield call(Api.fetchCatalogItem, action.payload.id); // раньше было так: (() => Api.fetchCatalogItem(action.payload.id))
    yield put(itemFetchSuccess(data));
  } catch (error) {
    yield put(itemFetchFailure(error.message));
  }
}

function* handleCatalogFetchSaga(action) {
  const catalog = yield select((state) => state.catalog);
  const { append } = action.payload;

  try {
    let data = null;

    if (catalog.categories.length === 0) {
      data = yield call(Api.fetchCatalogCategories);
      yield put(catalogFetchCategoriesSuccess(data));
    }

    // параметры запроса списка товаров: категория, сдвиг выборки и строка поиска
    const params = {};

    if (catalog.category) {
      params.categoryId = catalog.category;
    }

    if (append && catalog.items.length) {
      params.offset = catalog.items.length;
    }

    if (catalog.search) {
      params.q = catalog.search;
    }

    data = yield call(Api.fetchCatalogItems, params); // раньше было так: (() => Api.fetchCatalogItems(params))
    yield put(catalogFetchItemsSuccess(data, append));
    yield put(catalogFetchSuccess());
  } catch (error) {
    if (catalog.categories.length && catalog.items.length) {
      yield put(catalogFetchSuccess());
    }

    yield put(catalogFetchFailure(error.message));
  }
}

function* handleCartSendSaga(action) {
  try {
    const { owner } = action.payload;
    const { orders } = yield select((state) => state.cart);
    const data = {
      owner,
      items: orders.map(({ id, price, count, size }) => ({ id, price, count, size })),
    };

    // отмена запроса, если пользовать ушёл со страницы корзины
    const { result } = yield race({
      result: call(Api.sendCart, data), // раньше было так: (() => Api.sendCart(data))
      location: take(LOCATION_CHANGE),
    });

    // заказ успешно оформлен, если пользователь дождался ответа сервера
    if (result) {
      yield put(cartSendSuccess());
    }
  } catch (error) {
    yield put(cartSendFailure(error.message));
  }
}


// WATCHERS //

export function* watchHitsSalesFetchSaga() {
  yield takeLatest(HITS_SALES_FETCH_REQUEST, handleHitsSalesFetchSaga);
}

export function* watchItemFetchSaga() {
  yield takeLatest(ITEM_FETCH_REQUEST, handleItemFetchSaga);
}

export function* watchCatalogFetchSaga() {
  yield takeLatest(CATALOG_FETCH_REQUEST, handleCatalogFetchSaga);
}

export function* watchCatalogRefetchSaga() {
  while (true) {
    yield take(CATALOG_CATEGORY_CHANGE);
    yield put(catalogFetchRequest(false));
  }
}

export function* watchCartSendSaga() {
  yield takeLatest(CART_SEND_REQUEST, handleCartSendSaga);
}


// ROOT SAGA spawn //

export default function* saga() {
  yield spawn(watchItemFetchSaga);
  yield spawn(watchHitsSalesFetchSaga);
  yield spawn(watchCatalogFetchSaga);
  yield spawn(watchCatalogRefetchSaga);
  yield spawn(watchCartSendSaga);
}