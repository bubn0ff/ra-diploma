import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createBrowserHistory } from 'history';
import { routerMiddleware, connectRouter } from 'connected-react-router';
import saga from '../sagas/index';
import catalogReducer from '../reducers/catalogReducer';
import hitsSalesReducer from '../reducers/hitsSalesReducer';
import itemReducer from '../reducers/itemReducer';
import cartReducer from '../reducers/cartReducer';
// import { cartStorageMiddleware, cartRehydrateStore } from './cartStorage';

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
  composeEnhancers(applyMiddleware(
    routerMiddleware(history),
    sagaMiddleware,
  )),
);

sagaMiddleware.run(saga);

export default store;