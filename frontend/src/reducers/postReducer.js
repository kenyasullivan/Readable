import _ from "lodash";
import {
  FETCH_POSTS,
  FETCH_POST,
  EDIT_POST,
  VOTE_FOR_POST,
  DELETE_POST
} from "../actions";

export default function postReducer(state = {}, action) {
  switch (action.type) {
    case VOTE_FOR_POST:
    case FETCH_POST:
      return { ...state, [action.payload.id]: action.payload };
    case FETCH_POSTS:
      return _.mapKeys(action.payload, "id");
    case DELETE_POST:
      return _.omit(state, action.payload.id);
    case EDIT_POST:
      return {
        ...state,
        [action.payload.id]: action.payload
      };
    default:
      return state;
  }
}
