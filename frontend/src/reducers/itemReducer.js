import { ITEM_FETCH_REQUEST, ITEM_FETCH_FAILURE, ITEM_FETCH_SUCCESS } from '../actions/actionTypes';

const initialState = {
  item: null,
  loading: false,
  error: null,
};

export default function itemReducer(state = initialState, action) {
  switch (action.type) {
    case ITEM_FETCH_REQUEST:
      return { ...initialState, loading: true };

    case ITEM_FETCH_FAILURE:
      return { ...state, loading: false, error: action.payload.error };

    case ITEM_FETCH_SUCCESS:
      return { ...state, loading: false, item: action.payload.item };

    default:
      return state;
  }
}