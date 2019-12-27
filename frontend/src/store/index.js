import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createBrowserHistory } from 'history';
import { routerMiddleware, connectRouter } from 'connected-react-router';
import saga from '../sagas/index';
import catalogReducer from '../reducers/catalogReducer';
import hitsSalesReducer from '../reducers/hitsSalesReducer';
import itemReducer from '../reducers/itemReducer';
import cartReducer from '../reducers/cartReducer';
import { storageCartMiddleware, storageCartInit } from '../api/apiCartLocaleStorage';

export const history = createBrowserHistory();

const reducer = combineReducers({
  router: connectRouter(history),
  hitsSales: hitsSalesReducer,
  catalog: catalogReducer,
  product: itemReducer,
  cart: cartReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  reducer,
  { cart: storageCartInit() },
  composeEnhancers(applyMiddleware(routerMiddleware(history), sagaMiddleware, storageCartMiddleware)),
);

sagaMiddleware.run(saga);

export default store;