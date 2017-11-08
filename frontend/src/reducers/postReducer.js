import _ from "lodash";
import sortBy from "sort-by";
import {
  FETCH_POSTS,
  FETCH_POST,
  EDIT_POST,
  VOTE_FOR_POST,
  DELETE_POST,
  DELETE_POST_LIST
} from "../actions";

export default function(state = {}, action) {
  switch (action.type) {
    case VOTE_FOR_POST:
    // return {
    //   ...state,
    //   voteScore: [action.payload]
    // };
    case FETCH_POST:
      return { ...state, [action.payload.id]: action.payload };
    case FETCH_POSTS:
      return _.mapKeys(action.payload, "id");
    case DELETE_POST:
      return _.omit(state, action.payload);
    case EDIT_POST:
      return {
        ...state,
        [action.payload.id]: action.payload
      };
    case DELETE_POST_LIST:
      return _.omit(state, { id: action.payload.id });
    default:
      return state;
  }
}
