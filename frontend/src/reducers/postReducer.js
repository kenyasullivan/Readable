import _ from "lodash";
import { FETCH_POSTS, FETCH_POST, EDIT_POST } from "../actions";

//pass in initial state, and action
export default function(state = {}, action) {
  switch (action.type) {
    case FETCH_POST:
      return { ...state, [action.payload.id]: action.payload };
    case FETCH_POSTS:
      return _.mapKeys(action.payload, "id");
    // case EDIT_POST:
    //   return
    //   state.map(post => {
    //     if (post.id === action.id) {
    //       return {
    //         ...post,
    //         ...post.updates
    //       };
    //     }
    //     return post;
    //   });
    case EDIT_POST:
      return {
        ...state,
        [action.payload.id]: action.payload
      };
    default:
      return state;
  }
}
