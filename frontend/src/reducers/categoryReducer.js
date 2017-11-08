import { FETCH_CATEGORIES, FILTER_CATEGORY } from "../actions";

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_CATEGORIES:
      return action.payload;
    case FILTER_CATEGORY:
      return {
        ...state,
        selected: action.category
      };
    default:
      return state;
  }
}
