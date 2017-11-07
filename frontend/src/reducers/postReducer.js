import _ from "lodash";
import sortBy from "sort-by";
import {
  FETCH_POSTS,
  FETCH_POST,
  EDIT_POST,
  VOTE_FOR_POST,
  SORT_BY_VOTE,
  SORT_BY_TIME
} from "../actions";

export default function(state = {}, action) {
  switch (action.type) {
    case SORT_BY_VOTE:
      return { ...state.sort(sortBy("voteScore")) };
    case VOTE_FOR_POST:
    // return {
    //   ...state,
    //   voteScore: [action.payload]
    // };
    case FETCH_POST:
      return { ...state, [action.payload.id]: action.payload };
    case FETCH_POSTS:
      return _.mapKeys(action.payload, "id");
    case EDIT_POST:
      return {
        ...state,
        [action.payload.id]: action.payload
      };
    case SORT_BY_TIME:
      return { ...state.sort(sortBy("timestamp")) };
    default:
      return state;
  }
}
