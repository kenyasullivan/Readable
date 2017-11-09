import { FETCH_CATEGORIES } from "../actions";

const INIT_STATE = {
  all: []
};
export default function categoryReducer(state = INIT_STATE, action) {
  switch (action.type) {
    case FETCH_CATEGORIES:
      return {
        ...state,
        all: action.payload.categories
      };
    default:
      return state;
  }
}
