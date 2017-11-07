import { SORT_FOR_POSTS } from "../actions";

export default function sortMethod(state = "voteScore", action) {
  switch (action.type) {
    case SORT_FOR_POSTS:
      return action.payload;
    default:
      return state;
  }
}
