import { 
  HITS_SALES_FETCH_REQUEST,
  HITS_SALES_FETCH_FAILURE,
  HITS_SALES_FETCH_SUCCESS,
} from '../actions/actionTypes';

const initialState = {
  items: [],
  loading: false,
  error: null,
};

export default function hitsSalesReducer(state = initialState, action) {
  switch (action.type) {
    case HITS_SALES_FETCH_REQUEST:
      return { ...initialState, loading: true };

    case HITS_SALES_FETCH_FAILURE:
      return { ...state, loading: false, error: action.payload.error };

    case HITS_SALES_FETCH_SUCCESS:
      return { ...state, loading: false, items: action.payload.items };

    default:
      return state;
  }
}