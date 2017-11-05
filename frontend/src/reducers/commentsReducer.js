import _ from "lodash";
import { FETCH_COMMENTS, CREATE_COMMENT } from "../actions";

function comments(state = {}, action) {
  switch (action.type) {
    case FETCH_COMMENTS:
      return _.mapKeys(action.payload, "id");
    case CREATE_COMMENT:
      return {
        ...state,
        [action.payload.id]: action.payload
      };
    default:
      return state;
  }
}
export default comments;
