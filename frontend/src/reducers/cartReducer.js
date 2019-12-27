import {
  CART_SEND_INIT,
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SEND_REQUEST,
  CART_SEND_FAILURE,
  CART_SEND_SUCCESS,
} from '../actions/actionTypes';

const initialState = {
  orders: [],
  sending: false,
  error: null,
  success: false,
};

const compareOrder = (a, b) => (
  a.id === b.id && a.size === b.size && a.price === b.price
);

export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case CART_SEND_INIT:
      return { ...state, sending: false, error: null, success: false };

    case CART_ADD_ITEM: {
      const orders = [...state.orders];
      const orderIndex = orders.findIndex((el) => compareOrder(el, action.payload.order));

      if (orderIndex === -1) {
        orders.push(action.payload.order);
      } else {
        orders[orderIndex].count += action.payload.order.count;
      }

      return { ...state, orders };
    }

    case CART_REMOVE_ITEM:
      return { ...state, orders: state.orders.filter((o) => o.id !== action.payload.id) };

    case CART_SEND_REQUEST:
      return { ...state, sending: true, error: null, success: false };

    case CART_SEND_FAILURE:
      return { ...state, sending: false, error: action.payload.error };

    case CART_SEND_SUCCESS:
      return { ...state, orders: [], sending: false, success: true };

    default:
      return state;
  }
}