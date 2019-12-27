import {
  CATALOG_INIT,
  CATALOG_FETCH_REQUEST,
  CATALOG_FETCH_FAILURE,
  CATALOG_FETCH_SUCCESS,
  CATALOG_FETCH_CATEGORIES_SUCCESS,
  CATALOG_FETCH_ITEMS_SUCCESS,
  CATALOG_CATEGORY_CHANGE,
  CATALOG_SEARCH_CHANGE,
} from '../actions/actionTypes';

const initialState = {
  categories: [],
  category: 0, // активная категория
  search: '', // значение со строки поиска
  items: [],
  more: true,
  loading: false,
  error: null,
};

export default function catalogReducer(state = initialState, action) {
  switch (action.type) {
    case CATALOG_INIT:
      return { ...initialState, search: action.payload.search };
    
    case CATALOG_FETCH_REQUEST:
      return {
        ...state,
        ...action.payload.properties,
        items: action.payload.append ? [...state.items] : [],
        error: null,
        loading: true,
      };
    
    case CATALOG_FETCH_FAILURE:
      return { ...state, loading: false, error: action.payload.error };

    case CATALOG_FETCH_SUCCESS:
      return { ...state, loading: false };

    case CATALOG_FETCH_CATEGORIES_SUCCESS:
      return {
        ...state,
        categories: [ { id: 0, title: 'Все' }, ...action.payload.categories ],
      };

    case CATALOG_FETCH_ITEMS_SUCCESS: {
      const { items, append } = action.payload;

      return {
        ...state,
        items: append ? [...state.items, ...items] : items,
        more: items.length > 5,
      };
    }

    case CATALOG_CATEGORY_CHANGE:
      return { ...state, category: action.payload.category };

    case CATALOG_SEARCH_CHANGE:
      return { ...state, search: action.payload.value };

    default:
      return state;
  }
}